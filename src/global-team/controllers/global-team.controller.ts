import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { GlobalTeamService } from '../services/global-team.service.js';
import { CreateGlobalTeamDto } from '../dtos/create-global-team.dto.js';
import { UpdateGlobalTeamDto } from '../dtos/update-global-team.dto.js';
import { IGlobalTeamController } from './interfaces/global-team.controller.interface.js';

@Controller('global-teams')
@UseGuards(AdminJwtGuard)
export class GlobalTeamController implements IGlobalTeamController {
  constructor(private readonly service: GlobalTeamService) {}


  @Post() create(@Body() dto: CreateGlobalTeamDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateGlobalTeamDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.delete(id); }
}