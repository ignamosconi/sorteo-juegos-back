import { DefaultSportEntity } from '../../entities/default-sport.entity.js';
import { CreateDefaultSportDto } from '../../dtos/create-default-sport.dto.js';
import { UpdateDefaultSportDto } from '../../dtos/update-default-sport.dto.js';

export interface IDefaultSportController {
  findAll(): Promise<DefaultSportEntity[]>;
  create(dto: CreateDefaultSportDto): Promise<DefaultSportEntity>;
  update(id: string, dto: UpdateDefaultSportDto): Promise<DefaultSportEntity>;
  remove(id: string): Promise<void>;
}