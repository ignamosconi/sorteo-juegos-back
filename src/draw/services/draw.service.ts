import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DrawPhase, DrawStateEntity } from '../entities/draw-state.entity.js';
import type { IDrawRepository } from '../repositories/interfaces/draw.repository.interface.js';
import { DRAW_REPOSITORY } from '../repositories/interfaces/draw.repository.interface.js';
import { SportService } from '../../sport/services/sport.service.js';
import type { IRaffleService } from '../../raffle/services/interfaces/raffle.service.interface.js';
import { RAFFLE_SERVICE } from '../../raffle/services/interfaces/raffle.service.interface.js';
import { RaffleEntity, RaffleStatus } from '../../raffle/entities/raffle.entity.js';
import type { IDrawService } from './interfaces/draw.service.interface.js';
import { SelectContextDto } from '../dtos/select-context.dto.js';
import {
  DrawFullStateResponseDto,
  DrawTeamResponseDto,
  DrawGroupResponseDto,
  PublicResultsResponseDto,
} from '../dtos/draw-response.dto.js';

@Injectable()
export class DrawService implements IDrawService {
  constructor(
    @Inject(DRAW_REPOSITORY) private readonly repo: IDrawRepository,
    private readonly sportService: SportService,
    @Inject(RAFFLE_SERVICE) private readonly raffleService: IRaffleService,
  ) {}

  async getState(raffleId: string): Promise<DrawStateEntity | null> {
    const raffle = await this.raffleService.findById(raffleId);
    let state = await this.repo.getState(raffleId);
    if (!state && raffle.status === RaffleStatus.IN_PROGRESS) {
      state = await this.repo.createState(raffleId);
    }
    return state;
  }

  async getFullState(raffleId: string): Promise<DrawFullStateResponseDto> {
    const state = await this.getState(raffleId);
    if (!state) return { phase: 'idle', remainingTeams: [], remainingGroups: [], results: [] } as unknown as DrawFullStateResponseDto;

    const results = await this.repo.getResults(raffleId);

    let remainingTeams: unknown[] = [];
    let remainingGroups: unknown[] = [];

    if (state.currentSportId) {
      const assignedTeams = await this.sportService.findAssignedTeams(state.currentSportId, state.currentSportCategoryId ?? null);
      const drawnTeamIds = new Set(
        results
          .filter(r => r.sportCategoryGroup.sportId === state.currentSportId && r.sportCategoryGroup.sportCategoryId === state.currentSportCategoryId)
          .map(r => r.raffleTeamId)
      );
      remainingTeams = assignedTeams.filter(t => !drawnTeamIds.has(t.raffleTeamId)).map(t => t.raffleTeam);

      const groups = await this.sportService.findGroups(state.currentSportId, state.currentSportCategoryId ?? null);
      const groupResultCounts = new Map<string, number>();
      results.forEach(r => {
        if (r.sportCategoryGroup.sportId === state.currentSportId) {
          groupResultCounts.set(r.sportCategoryGroupId, (groupResultCounts.get(r.sportCategoryGroupId) ?? 0) + 1);
        }
      });
      remainingGroups = groups.filter(g => (groupResultCounts.get(g.id) ?? 0) < g.capacity);
    }

    return { state, remainingTeams, remainingGroups, results };
  }

  async selectContext(raffleId: string, dto: SelectContextDto): Promise<DrawFullStateResponseDto> {
    const state = await this.getState(raffleId);
    if (!state) throw new BadRequestException('Sorteo no iniciado');

    await this.repo.updateState(raffleId, {
      currentSportId: dto.sportId,
      currentSportCategoryId: dto.sportCategoryId ?? null,
      drawnTeamId: null,
      phase: DrawPhase.PICKING_TEAM,
    });
    return this.getFullState(raffleId);
  }

  async drawTeam(raffleId: string): Promise<DrawTeamResponseDto> {
    const full = await this.getFullState(raffleId);
    if (full.state?.phase !== DrawPhase.PICKING_TEAM) {
      throw new BadRequestException('No es el turno de sortear un equipo');
    }
    const teams = full.remainingTeams as Array<{ id: string }>;
    if (teams.length === 0) throw new BadRequestException('No hay equipos disponibles');

    const team = teams[Math.floor(Math.random() * teams.length)];
    await this.repo.updateState(raffleId, { drawnTeamId: team.id, phase: DrawPhase.PICKING_GROUP });
    return { team, state: full.state };
  }

  async drawGroup(raffleId: string): Promise<DrawGroupResponseDto> {
    const full = await this.getFullState(raffleId);
    if (full.state?.phase !== DrawPhase.PICKING_GROUP) {
      throw new BadRequestException('No es el turno de sortear un grupo');
    }
    const groups = full.remainingGroups as Array<{ id: string; name: string }>;
    if (groups.length === 0) throw new BadRequestException('No hay grupos disponibles');
    const drawnTeamId = full.state.drawnTeamId;
    if (!drawnTeamId) throw new BadRequestException('No hay equipo sorteado');

    const group = groups[Math.floor(Math.random() * groups.length)];

    const groupResults = await this.repo.getResultsByGroup(group.id);
    const position = groupResults.length + 1;

    const result = await this.repo.createResult({
      raffleId,
      sportCategoryGroupId: group.id,
      raffleTeamId: drawnTeamId,
      position,
    });

    await this.repo.updateState(raffleId, {
      drawnTeamId: null,
      phase: DrawPhase.PICKING_TEAM,
      lastDrawResultId: result.id,
    });

    const newFull = await this.getFullState(raffleId);
    const isDone = (newFull.remainingTeams as unknown[]).length === 0;
    if (isDone) {
      await this.repo.updateState(raffleId, { phase: DrawPhase.IDLE, currentSportId: null, currentSportCategoryId: null });
    }

    return { result, isDone };
  }

  async undoLast(raffleId: string): Promise<DrawFullStateResponseDto> {
    const lastResult = await this.repo.getLastResult(raffleId);
    if (!lastResult) throw new BadRequestException('No hay sorteo para deshacer');

    await this.repo.deleteResult(lastResult.id);
    const state = await this.getState(raffleId);
    if (state?.currentSportId || lastResult.sportCategoryGroup.sportId) {
      await this.repo.updateState(raffleId, {
        currentSportId: lastResult.sportCategoryGroup.sportId,
        currentSportCategoryId: lastResult.sportCategoryGroup.sportCategoryId,
        drawnTeamId: null,
        phase: DrawPhase.PICKING_TEAM,
        lastDrawResultId: null,
      });
    }
    return this.getFullState(raffleId);
  }

  async getPublicResults(publicSlug: string): Promise<PublicResultsResponseDto> {
    const raffleRepo = (this.raffleService as unknown as { repo: { findByPublicSlug(slug: string): Promise<RaffleEntity | null> } }).repo;
    const raffle = await raffleRepo.findByPublicSlug(publicSlug);
    if (!raffle) throw new NotFoundException('Sorteo no encontrado');
    const sports = await this.sportService.findByRaffle(raffle.id);
    const results = await this.repo.getResults(raffle.id);

    const sportsWithData = await Promise.all(sports.map(async sport => {
      const categories = await this.sportService.findCategories(sport.id);
      const hasCategories = categories.length > 0;
      const sections = hasCategories ? categories : [null];

      const sectionsData = await Promise.all(sections.map(async (cat) => {
        const groups = await this.sportService.findGroups(sport.id, cat?.id ?? null);
        const groupsData = groups.map(group => {
          const groupResults = results.filter(r => r.sportCategoryGroupId === group.id)
            .sort((a, b) => a.position - b.position);
          return { ...group, results: groupResults };
        });
        return { category: cat, groups: groupsData };
      }));

      return { sport, hasCategories, sections: sectionsData };
    }));

    return { raffle, sports: sportsWithData };
  }

  async getRaffleByDrawSlug(drawSlug: string): Promise<RaffleEntity> {
    const raffleRepo = (this.raffleService as unknown as { repo: { findByDrawSlug(slug: string): Promise<RaffleEntity | null> } }).repo;
    const raffle = await raffleRepo.findByDrawSlug(drawSlug);
    if (!raffle) throw new NotFoundException('Sorteo no encontrado');
    return raffle;
  }
}