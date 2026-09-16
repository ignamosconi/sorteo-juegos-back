import { DefaultSportEntity } from '../../entities/default-sport.entity.js';

export const DEFAULT_SPORT_REPOSITORY = Symbol('DEFAULT_SPORT_REPOSITORY');

export interface IDefaultSportRepository {
  findAll(): Promise<DefaultSportEntity[]>;
  findById(id: string): Promise<DefaultSportEntity | null>;
  create(data: Partial<DefaultSportEntity>): Promise<DefaultSportEntity>;
  update(id: string, data: Partial<DefaultSportEntity>): Promise<DefaultSportEntity | null>;
  delete(id: string): Promise<void>;
}