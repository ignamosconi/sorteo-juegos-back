import { GlobalTeamEntity } from '../../entities/global-team.entity.js';

export const GLOBAL_TEAM_REPOSITORY = 'GLOBAL_TEAM_REPOSITORY';

export interface IGlobalTeamRepository {
  findAll(): Promise<GlobalTeamEntity[]>;
  findById(id: string): Promise<GlobalTeamEntity | null>;
  create(data: Partial<GlobalTeamEntity>): Promise<GlobalTeamEntity>;
  update(id: string, data: Partial<GlobalTeamEntity>): Promise<GlobalTeamEntity | null>;
  delete(id: string): Promise<void>;
}