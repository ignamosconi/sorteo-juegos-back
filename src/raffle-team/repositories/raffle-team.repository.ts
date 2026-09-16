import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaffleTeamEntity } from '../entities/raffle-team.entity.js';
import { IRaffleTeamRepository } from './interfaces/raffle-team.repository.interface.js';

@Injectable()
export class RaffleTeamRepository implements IRaffleTeamRepository {
  constructor(@InjectRepository(RaffleTeamEntity) private readonly repo: Repository<RaffleTeamEntity>) {}

  findByRaffle(raffleId: string): Promise<RaffleTeamEntity[]> {
    return this.repo.find({ where: { raffleId }, order: { name: 'ASC' } });
  }

  findById(id: string): Promise<RaffleTeamEntity | null> { return this.repo.findOne({ where: { id } }); }

  createMany(items: Partial<RaffleTeamEntity>[]): Promise<RaffleTeamEntity[]> {
    return this.repo.save(items.map(i => this.repo.create(i)));
  }

  create(data: Partial<RaffleTeamEntity>): Promise<RaffleTeamEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<RaffleTeamEntity>): Promise<RaffleTeamEntity | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> { await this.repo.delete(id); }
}