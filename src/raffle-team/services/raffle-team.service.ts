import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RaffleTeamEntity } from '../entities/raffle-team.entity.js';
import { CreateRaffleTeamDto, ImportGlobalTeamsDto } from '../dtos/create-raffle-team.dto.js';
import { UpdateRaffleTeamDto } from '../dtos/update-raffle-team.dto.js';
import type { IRaffleTeamRepository } from '../repositories/interfaces/raffle-team.repository.interface.js';
import { RAFFLE_TEAM_REPOSITORY } from '../repositories/interfaces/raffle-team.repository.interface.js';
import type { IRaffleTeamService } from './interfaces/raffle-team.service.interface.js';
import type { IGlobalTeamService } from '../../global-team/services/interfaces/global-team.service.interface.js';
import { GLOBAL_TEAM_SERVICE } from '../../global-team/services/interfaces/global-team.service.interface.js';

@Injectable()
export class RaffleTeamService implements IRaffleTeamService {
  constructor(
    @Inject(RAFFLE_TEAM_REPOSITORY) private readonly repo: IRaffleTeamRepository,
    @Inject(GLOBAL_TEAM_SERVICE) private readonly globalTeamService: IGlobalTeamService,
  ) {}

  findByRaffle(raffleId: string): Promise<RaffleTeamEntity[]> {
    return this.repo.findByRaffle(raffleId);
  }

  create(raffleId: string, dto: CreateRaffleTeamDto): Promise<RaffleTeamEntity> {
    return this.repo.create({ ...dto, raffleId });
  }

  async importFromGlobal(raffleId: string, dto: ImportGlobalTeamsDto): Promise<RaffleTeamEntity[]> {
    const selected = await Promise.all(
      dto.globalTeamIds.map((id) => this.globalTeamService.findById(id)),
    );

    return this.repo.createMany(
      selected.map((t) => ({
        raffleId,
        name: t.name,
        abbreviation: t.abbreviation,
        imagePath: t.imagePath,
      })),
    );
  }

  async update(id: string, dto: UpdateRaffleTeamDto): Promise<RaffleTeamEntity> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Equipo no encontrado');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Equipo no encontrado');
    return this.repo.delete(id);
  }
}