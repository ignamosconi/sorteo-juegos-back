import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SportEntity } from '../entities/sport.entity.js';
import { SportCategoryEntity } from '../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../entities/sport-category-team.entity.js';
import type { ISportRepository } from '../repositories/interfaces/sport.repository.interface.js';
import { SPORT_REPOSITORY } from '../repositories/interfaces/sport.repository.interface.js';
import type { ISportService } from './interfaces/sport.service.interface.js';

@Injectable()
export class SportService implements ISportService {
  constructor(@Inject(SPORT_REPOSITORY) private readonly repo: ISportRepository) {}

  findByRaffle(raffleId: string): Promise<SportEntity[]> {
    return this.repo.findByRaffle(raffleId);
  }

  createSport(raffleId: string, name: string, order = 0): Promise<SportEntity> {
    return this.repo.createSport({ raffleId, name, order });
  }

  async updateSport(id: string, data: Partial<SportEntity>): Promise<SportEntity> {
    const updated = await this.repo.updateSport(id, data);
    if (!updated) throw new NotFoundException('Deporte no encontrado');
    return updated;
  }

  async deleteSport(id: string): Promise<void> {
    const found = await this.repo.findSportById(id);
    if (!found) throw new NotFoundException('Deporte no encontrado');
    return this.repo.deleteSport(id);
  }

  findCategories(sportId: string): Promise<SportCategoryEntity[]> {
    return this.repo.findCategoriesBySport(sportId);
  }

  createCategory(sportId: string, name: string, order = 0): Promise<SportCategoryEntity> {
    return this.repo.createCategory({ sportId, name, order });
  }

  async updateCategory(id: string, data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity> {
    const updated = await this.repo.updateCategory(id, data);
    if (!updated) throw new NotFoundException('Categoría no encontrada');
    return updated;
  }

  async deleteCategory(id: string): Promise<void> {
    const found = await this.repo.findCategoryById(id);
    if (!found) throw new NotFoundException('Categoría no encontrada');
    return this.repo.deleteCategory(id);
  }

  findGroups(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryGroupEntity[]> {
    return this.repo.findGroups(sportId, sportCategoryId);
  }

  createGroups(
    sportId: string,
    sportCategoryId: string | null,
    groups: { name: string; capacity: number }[],
  ): Promise<SportCategoryGroupEntity[]> {
    return this.repo.createGroups(
      groups.map((g, i) => ({
        sportId,
        sportCategoryId,
        name: g.name,
        capacity: g.capacity,
        sortOrder: i,
      })),
    );
  }

  async updateGroup(id: string, data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity> {
    const updated = await this.repo.updateGroup(id, data);
    if (!updated) throw new NotFoundException('Grupo no encontrado');
    return updated;
  }

  async deleteGroup(id: string): Promise<void> {
    const found = await this.repo.findGroupById(id);
    if (!found) throw new NotFoundException('Grupo no encontrado');
    return this.repo.deleteGroup(id);
  }

  findAssignedTeams(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryTeamEntity[]> {
    return this.repo.findAssignedTeams(sportId, sportCategoryId);
  }

  assignTeam(
    sportId: string,
    sportCategoryId: string | null,
    raffleTeamId: string,
  ): Promise<SportCategoryTeamEntity> {
    return this.repo.assignTeam({ sportId, sportCategoryId, raffleTeamId });
  }

  async removeTeamAssignment(id: string): Promise<void> {
    return this.repo.removeTeamAssignment(id);
  }
}