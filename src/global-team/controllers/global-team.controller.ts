import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { CreateGlobalTeamDto } from '../dtos/create-global-team.dto.js';
import { UpdateGlobalTeamDto } from '../dtos/update-global-team.dto.js';
import { IGlobalTeamController } from './interfaces/global-team.controller.interface.js';
import type { IGlobalTeamService } from '../services/interfaces/global-team.service.interface.js';
import { GLOBAL_TEAM_SERVICE } from '../services/interfaces/global-team.service.interface.js';
import { GlobalTeamEntity } from '../entities/global-team.entity.js';

@Controller('global-teams')
@UseGuards(AdminJwtGuard)
export class GlobalTeamController implements IGlobalTeamController {
  constructor(@Inject(GLOBAL_TEAM_SERVICE) private readonly service: IGlobalTeamService) {}

  @Get()
  findAll(): Promise<GlobalTeamEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<GlobalTeamEntity> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateGlobalTeamDto): Promise<GlobalTeamEntity> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGlobalTeamDto): Promise<GlobalTeamEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}