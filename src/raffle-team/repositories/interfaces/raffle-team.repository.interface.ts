import { RaffleTeamEntity } from '../../entities/raffle-team.entity.js';

export const RAFFLE_TEAM_REPOSITORY = 'RAFFLE_TEAM_REPOSITORY';

export interface IRaffleTeamRepository {
  findByRaffle(raffleId: string): Promise<RaffleTeamEntity[]>;
  findById(id: string): Promise<RaffleTeamEntity | null>;
  createMany(items: Partial<RaffleTeamEntity>[]): Promise<RaffleTeamEntity[]>;
  create(data: Partial<RaffleTeamEntity>): Promise<RaffleTeamEntity>;
  update(id: string, data: Partial<RaffleTeamEntity>): Promise<RaffleTeamEntity | null>;
  delete(id: string): Promise<void>;
}