import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { RaffleEntity } from '../entities/raffle.entity.js';
import { IRaffleRepository } from './interfaces/raffle.repository.interface.js';

@Injectable()
export class RaffleRepository implements IRaffleRepository {
  constructor(@InjectRepository(RaffleEntity) private readonly repo: Repository<RaffleEntity>) {}

  findAll(filters?: { name?: string; sortByDate?: boolean }): Promise<RaffleEntity[]> {
    const options: FindManyOptions<RaffleEntity> = {
      order: { createdAt: filters?.sortByDate ? 'DESC' : 'ASC' },
    };
    if (filters?.name) options.where = { name: ILike(`%${filters.name}%`) };
    return this.repo.find(options);
  }

  findById(id: string): Promise<RaffleEntity | null> { return this.repo.findOne({ where: { id } }); }
  findByPublicSlug(slug: string): Promise<RaffleEntity | null> { return this.repo.findOne({ where: { publicSlug: slug } }); }
  findByDrawSlug(slug: string): Promise<RaffleEntity | null> { return this.repo.findOne({ where: { drawSlug: slug } }); }
  create(data: Partial<RaffleEntity>): Promise<RaffleEntity> { return this.repo.save(this.repo.create(data)); }
  async update(id: string, data: Partial<RaffleEntity>): Promise<RaffleEntity | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: string): Promise<void> { await this.repo.delete(id); }
}