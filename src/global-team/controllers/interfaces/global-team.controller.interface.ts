import { GlobalTeamEntity } from '../../entities/global-team.entity.js';
import { CreateGlobalTeamDto } from '../../dtos/create-global-team.dto.js';
import { UpdateGlobalTeamDto } from '../../dtos/update-global-team.dto.js';

export interface IGlobalTeamController {
  findAll(): Promise<GlobalTeamEntity[]>;
  create(dto: CreateGlobalTeamDto): Promise<GlobalTeamEntity>;
  update(id: string, dto: UpdateGlobalTeamDto): Promise<GlobalTeamEntity>;
  remove(id: string): Promise<void>;
}