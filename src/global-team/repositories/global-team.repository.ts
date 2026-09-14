import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalTeamEntity } from '../entities/global-team.entity.js';
import { IGlobalTeamRepository } from './interfaces/global-team.repository.interface.js';

@Injectable()
export class GlobalTeamRepository implements IGlobalTeamRepository {
  constructor(@InjectRepository(GlobalTeamEntity) private readonly repo: Repository<GlobalTeamEntity>) {}

  findAll(): Promise<GlobalTeamEntity[]> { return this.repo.find({ order: { name: 'ASC' } }); }
  findById(id: string): Promise<GlobalTeamEntity | null> { return this.repo.findOne({ where: { id } }); }
  create(data: Partial<GlobalTeamEntity>): Promise<GlobalTeamEntity> { return this.repo.save(this.repo.create(data)); }
  async update(id: string, data: Partial<GlobalTeamEntity>): Promise<GlobalTeamEntity | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: string): Promise<void> { await this.repo.delete(id); }
}