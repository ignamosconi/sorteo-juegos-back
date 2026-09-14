import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GlobalTeamEntity } from '../entities/global-team.entity.js';
import { CreateGlobalTeamDto } from '../dtos/create-global-team.dto.js';
import { UpdateGlobalTeamDto } from '../dtos/update-global-team.dto.js';
import type { IGlobalTeamRepository } from '../repositories/interfaces/global-team.repository.interface.js';
import { GLOBAL_TEAM_REPOSITORY } from '../repositories/interfaces/global-team.repository.interface.js';
import type { IGlobalTeamService } from './interfaces/global-team.service.interface.js';

@Injectable()
export class GlobalTeamService implements IGlobalTeamService {
  constructor(@Inject(GLOBAL_TEAM_REPOSITORY) private readonly repo: IGlobalTeamRepository) {}

  findAll(): Promise<GlobalTeamEntity[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<GlobalTeamEntity> {
    const team = await this.repo.findById(id);
    if (!team) throw new NotFoundException('Equipo global no encontrado');
    return team;
  }

  create(dto: CreateGlobalTeamDto): Promise<GlobalTeamEntity> {
    return this.repo.create(dto);
  }

  async update(id: string, dto: UpdateGlobalTeamDto): Promise<GlobalTeamEntity> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Equipo no encontrado');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Equipo no encontrado');
    return this.repo.delete(id);
  }
}