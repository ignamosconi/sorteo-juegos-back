import { RaffleEntity } from '../../entities/raffle.entity.js';

export const RAFFLE_REPOSITORY = 'RAFFLE_REPOSITORY';

export interface IRaffleRepository {
  findAll(filters?: { name?: string; sortByDate?: boolean }): Promise<RaffleEntity[]>;
  findById(id: string): Promise<RaffleEntity | null>;
  findByPublicSlug(slug: string): Promise<RaffleEntity | null>;
  findByDrawSlug(slug: string): Promise<RaffleEntity | null>;
  create(data: Partial<RaffleEntity>): Promise<RaffleEntity>;
  update(id: string, data: Partial<RaffleEntity>): Promise<RaffleEntity | null>;
  delete(id: string): Promise<void>;
}