import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrawResultEntity } from '../entities/draw-result.entity.js';
import { DrawStateEntity } from '../entities/draw-state.entity.js';
import { IDrawRepository } from './interfaces/draw.repository.interface.js';

@Injectable()
export class DrawRepository implements IDrawRepository {
  constructor(
    @InjectRepository(DrawResultEntity) private readonly resultRepo: Repository<DrawResultEntity>,
    @InjectRepository(DrawStateEntity) private readonly stateRepo: Repository<DrawStateEntity>,
  ) {}

  getState(raffleId: string): Promise<DrawStateEntity | null> {
    return this.stateRepo.findOne({ where: { raffleId } });
  }

  async createState(raffleId: string): Promise<DrawStateEntity> {
    return this.stateRepo.save(this.stateRepo.create({ raffleId, phase: 'idle' }));
  }

  async updateState(raffleId: string, data: Partial<DrawStateEntity>): Promise<DrawStateEntity> {
    await this.stateRepo.save({ ...data, raffleId });
    return this.getState(raffleId) as Promise<DrawStateEntity>;
  }

  getResults(raffleId: string): Promise<DrawResultEntity[]> {
    return this.resultRepo.find({ where: { raffleId }, order: { drawnAt: 'ASC' }, relations: ['raffleTeam', 'sportCategoryGroup'] });
  }

  getResultsByGroup(sportCategoryGroupId: string): Promise<DrawResultEntity[]> {
    return this.resultRepo.find({ where: { sportCategoryGroupId }, relations: ['raffleTeam'] });
  }

  createResult(data: Partial<DrawResultEntity>): Promise<DrawResultEntity> {
    return this.resultRepo.save(this.resultRepo.create(data));
  }

  async deleteResult(id: string): Promise<void> { await this.resultRepo.delete(id); }

  getLastResult(raffleId: string): Promise<DrawResultEntity | null> {
    return this.resultRepo.findOne({ where: { raffleId }, order: { drawnAt: 'DESC' }, relations: ['raffleTeam', 'sportCategoryGroup'] });
  }
}