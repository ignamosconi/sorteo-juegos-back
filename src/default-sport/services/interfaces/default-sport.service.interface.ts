import { DefaultSportEntity } from '../../entities/default-sport.entity.js';
import { CreateDefaultSportDto } from '../../dtos/create-default-sport.dto.js';
import { UpdateDefaultSportDto } from '../../dtos/update-default-sport.dto.js';

export const DEFAULT_SPORT_SERVICE = Symbol('DEFAULT_SPORT_SERVICE');

export interface IDefaultSportService {
  findAll(): Promise<DefaultSportEntity[]>;
  create(dto: CreateDefaultSportDto): Promise<DefaultSportEntity>;
  update(id: string, dto: UpdateDefaultSportDto): Promise<DefaultSportEntity>;
  delete(id: string): Promise<void>;
}