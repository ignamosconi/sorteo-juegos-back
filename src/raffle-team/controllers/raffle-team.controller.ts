import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { CreateRaffleTeamDto, ImportGlobalTeamsDto } from '../dtos/create-raffle-team.dto.js';
import { UpdateRaffleTeamDto } from '../dtos/update-raffle-team.dto.js';
import { IRaffleTeamController } from './interfaces/raffle-team.controller.interface.js';
import type { IRaffleTeamService } from '../services/interfaces/raffle-team.service.interface.js';
import { RAFFLE_TEAM_SERVICE } from '../services/interfaces/raffle-team.service.interface.js';
import { RaffleTeamEntity } from '../entities/raffle-team.entity.js';

@Controller()
@UseGuards(AdminJwtGuard)
export class RaffleTeamController implements IRaffleTeamController {
  constructor(@Inject(RAFFLE_TEAM_SERVICE) private readonly service: IRaffleTeamService) {}

  @Get('raffles/:raffleId/teams')
  findByRaffle(@Param('raffleId') raffleId: string): Promise<RaffleTeamEntity[]> {
    return this.service.findByRaffle(raffleId);
  }

  @Post('raffles/:raffleId/teams')
  create(
    @Param('raffleId') raffleId: string,
    @Body() dto: CreateRaffleTeamDto,
  ): Promise<RaffleTeamEntity> {
    return this.service.create(raffleId, dto);
  }

  @Post('raffles/:raffleId/teams/import')
  importFromGlobal(
    @Param('raffleId') raffleId: string,
    @Body() dto: ImportGlobalTeamsDto,
  ): Promise<RaffleTeamEntity[]> {
    return this.service.importFromGlobal(raffleId, dto);
  }

  @Patch('raffle-teams/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRaffleTeamDto): Promise<RaffleTeamEntity> {
    return this.service.update(id, dto);
  }

  @Delete('raffle-teams/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}