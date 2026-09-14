import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrawResultEntity } from '../entities/draw-result.entity.js';
import { DrawStateEntity, DrawPhase } from '../entities/draw-state.entity.js';
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
    return this.stateRepo.save(this.stateRepo.create({ raffleId, phase: DrawPhase.IDLE }));
  }

  async updateState(raffleId: string, data: Partial<DrawStateEntity>): Promise<DrawStateEntity> {
    const existing = await this.getState(raffleId);
    if (existing) {
      await this.stateRepo.save(this.stateRepo.merge(existing, data));
    } else {
      await this.stateRepo.save(this.stateRepo.create({ ...data, raffleId }));
    }
    const updated = await this.getState(raffleId);
    return updated!;
  }

  getResults(raffleId: string): Promise<DrawResultEntity[]> {
    return this.resultRepo.find({
      where: { raffleId },
      order: { drawnAt: 'ASC' },
      relations: {
        raffleTeam: true,
        sportCategoryGroup: true,
      },
    });
  }

  getResultsByGroup(sportCategoryGroupId: string): Promise<DrawResultEntity[]> {
    return this.resultRepo.find({
      where: { sportCategoryGroupId },
      relations: {
        raffleTeam: true,
      },
    });
  }

  createResult(data: Partial<DrawResultEntity>): Promise<DrawResultEntity> {
    return this.resultRepo.save(this.resultRepo.create(data));
  }

  async deleteResult(id: string): Promise<void> {
    await this.resultRepo.delete(id);
  }

  getLastResult(raffleId: string): Promise<DrawResultEntity | null> {
    return this.resultRepo.findOne({
      where: { raffleId },
      order: { drawnAt: 'DESC' },
      relations: {
        raffleTeam: true,
        sportCategoryGroup: true,
      },
    });
  }
}