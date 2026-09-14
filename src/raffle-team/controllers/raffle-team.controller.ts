import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { RaffleTeamService } from '../services/raffle-team.service.js';
import { CreateRaffleTeamDto, ImportGlobalTeamsDto } from '../dtos/create-raffle-team.dto.js';
import { UpdateRaffleTeamDto } from '../dtos/update-raffle-team.dto.js';

@Controller()
@UseGuards(AdminJwtGuard)
export class RaffleTeamController {
  constructor(private readonly service: RaffleTeamService) {}

  @Get('raffles/:raffleId/teams')
  findByRaffle(@Param('raffleId') raffleId: string) { return this.service.findByRaffle(raffleId); }

  @Post('raffles/:raffleId/teams')
  create(@Param('raffleId') raffleId: string, @Body() dto: CreateRaffleTeamDto) {
    return this.service.create(raffleId, dto);
  }

  @Post('raffles/:raffleId/teams/import')
  importFromGlobal(@Param('raffleId') raffleId: string, @Body() dto: ImportGlobalTeamsDto) {
    return this.service.importFromGlobal(raffleId, dto);
  }

  @Patch('raffle-teams/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRaffleTeamDto) { return this.service.update(id, dto); }

  @Delete('raffle-teams/:id')
  remove(@Param('id') id: string) { return this.service.delete(id); }
}