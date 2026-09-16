import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { IDrawController } from './interfaces/draw.controller.interface.js';
import type { IDrawService } from '../services/interfaces/draw.service.interface.js';
import { DRAW_SERVICE } from '../services/interfaces/draw.service.interface.js';
import { SelectContextDto } from '../dtos/select-context.dto.js';
import { UndoDrawDto } from '../dtos/undo-draw.dto.js';
import {
  DrawFullStateResponseDto,
  DrawTeamResponseDto,
  DrawGroupResponseDto,
  PublicResultsResponseDto,
} from '../dtos/draw-response.dto.js';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';

@Controller()
export class DrawController implements IDrawController {
  constructor(@Inject(DRAW_SERVICE) private readonly service: IDrawService) {}

  @Get('draw/:raffleId/state')
  @UseGuards(AdminJwtGuard)
  getFullState(@Param('raffleId') raffleId: string): Promise<DrawFullStateResponseDto> {
    return this.service.getFullState(raffleId);
  }

  @Post('draw/:raffleId/select-context')
  @UseGuards(AdminJwtGuard)
  selectContext(
    @Param('raffleId') raffleId: string,
    @Body() dto: SelectContextDto,
  ): Promise<DrawFullStateResponseDto> {
    return this.service.selectContext(raffleId, dto);
  }

  @Post('draw/:raffleId/draw-team')
  @UseGuards(AdminJwtGuard)
  drawTeam(@Param('raffleId') raffleId: string): Promise<DrawTeamResponseDto> {
    return this.service.drawTeam(raffleId);
  }

  @Post('draw/:raffleId/draw-group')
  @UseGuards(AdminJwtGuard)
  drawGroup(@Param('raffleId') raffleId: string): Promise<DrawGroupResponseDto> {
    return this.service.drawGroup(raffleId);
  }

  @Post('draw/:raffleId/undo')
  @UseGuards(AdminJwtGuard)
  undoLast(
    @Param('raffleId') raffleId: string,
    @Body() dto?: UndoDrawDto,
  ): Promise<DrawFullStateResponseDto> {
    return this.service.undoLast(raffleId, dto);
  }

  @Get('public/:publicSlug')
  getPublicResults(@Param('publicSlug') publicSlug: string): Promise<PublicResultsResponseDto> {
    return this.service.getPublicResults(publicSlug);
  }

  @Get('draw/by-slug/:drawSlug')
  @UseGuards(AdminJwtGuard)
  getRaffleByDrawSlug(@Param('drawSlug') drawSlug: string): Promise<RaffleEntity> {
    return this.service.getRaffleByDrawSlug(drawSlug);
  }
}