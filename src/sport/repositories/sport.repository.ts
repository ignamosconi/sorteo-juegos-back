import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { SportEntity } from '../entities/sport.entity.js';
import { SportCategoryEntity } from '../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../entities/sport-category-team.entity.js';
import { ISportRepository } from './interfaces/sport.repository.interface.js';

@Injectable()
export class SportRepository implements ISportRepository {
  constructor(
    @InjectRepository(SportEntity) private readonly sportRepo: Repository<SportEntity>,
    @InjectRepository(SportCategoryEntity) private readonly catRepo: Repository<SportCategoryEntity>,
    @InjectRepository(SportCategoryGroupEntity) private readonly groupRepo: Repository<SportCategoryGroupEntity>,
    @InjectRepository(SportCategoryTeamEntity) private readonly teamRepo: Repository<SportCategoryTeamEntity>,
  ) {}

  findByRaffle(raffleId: string): Promise<SportEntity[]> {
    return this.sportRepo.find({ where: { raffleId }, order: { order: 'ASC' } });
  }

  findSportById(id: string): Promise<SportEntity | null> {
    return this.sportRepo.findOne({ where: { id } });
  }

  createSport(data: Partial<SportEntity>): Promise<SportEntity> {
    return this.sportRepo.save(this.sportRepo.create(data));
  }

  async updateSport(id: string, data: Partial<SportEntity>): Promise<SportEntity | null> {
    await this.sportRepo.update(id, data);
    return this.findSportById(id);
  }

  async deleteSport(id: string): Promise<void> {
    await this.sportRepo.delete(id);
  }

  findCategoriesBySport(sportId: string): Promise<SportCategoryEntity[]> {
    return this.catRepo.find({ where: { sportId }, order: { order: 'ASC' } });
  }

  findCategoryById(id: string): Promise<SportCategoryEntity | null> {
    return this.catRepo.findOne({ where: { id } });
  }

  createCategory(data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity> {
    return this.catRepo.save(this.catRepo.create(data));
  }

  async updateCategory(id: string, data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity | null> {
    await this.catRepo.update(id, data);
    return this.findCategoryById(id);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.catRepo.delete(id);
  }

  findGroups(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryGroupEntity[]> {
    const where: any = { sportId };
    if (sportCategoryId === null) where.sportCategoryId = IsNull();
    else if (sportCategoryId) where.sportCategoryId = sportCategoryId;
    return this.groupRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  findGroupById(id: string): Promise<SportCategoryGroupEntity | null> {
    return this.groupRepo.findOne({ where: { id } });
  }

  createGroup(data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity> {
    return this.groupRepo.save(this.groupRepo.create(data));
  }

  createGroups(data: Partial<SportCategoryGroupEntity>[]): Promise<SportCategoryGroupEntity[]> {
    return this.groupRepo.save(data.map((d) => this.groupRepo.create(d)));
  }

  async updateGroup(id: string, data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity | null> {
    await this.groupRepo.update(id, data);
    return this.findGroupById(id);
  }

  async deleteGroup(id: string): Promise<void> {
    await this.groupRepo.delete(id);
  }

  findAssignedTeams(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryTeamEntity[]> {
    const where: any = { sportId };
    if (sportCategoryId === null) where.sportCategoryId = IsNull();
    else if (sportCategoryId) where.sportCategoryId = sportCategoryId;
    return this.teamRepo.find({
      where,
      relations: {
        raffleTeam: true,
      },
    });
  }

  assignTeam(data: Partial<SportCategoryTeamEntity>): Promise<SportCategoryTeamEntity> {
    return this.teamRepo.save(this.teamRepo.create(data));
  }

  async removeTeamAssignment(id: string): Promise<void> {
    await this.teamRepo.delete(id);
  }
}