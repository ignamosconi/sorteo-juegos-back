import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultSportEntity } from '../entities/default-sport.entity.js';
import { IDefaultSportRepository } from './interfaces/default-sport.repository.interface.js';

@Injectable()
export class DefaultSportRepository implements IDefaultSportRepository {
  constructor(@InjectRepository(DefaultSportEntity) private readonly repo: Repository<DefaultSportEntity>) {}

  findAll(): Promise<DefaultSportEntity[]> {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  findById(id: string): Promise<DefaultSportEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<DefaultSportEntity>): Promise<DefaultSportEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<DefaultSportEntity>): Promise<DefaultSportEntity | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}