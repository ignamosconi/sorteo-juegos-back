import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { DrawService } from '../services/draw.service.js';
import { IsOptional, IsString, IsUUID } from 'class-validator';

class SelectContextDto {
  @IsUUID() sportId!: string;
  @IsOptional() @IsString() sportCategoryId?: string;
}

@Controller()
export class DrawController {
  constructor(private readonly service: DrawService) {}

  @Get('draw/:raffleId/state')
  @UseGuards(AdminJwtGuard)
  getFullState(@Param('raffleId') raffleId: string) { return this.service.getFullState(raffleId); }

  @Post('draw/:raffleId/select-context')
  @UseGuards(AdminJwtGuard)
  selectContext(@Param('raffleId') raffleId: string, @Body() dto: SelectContextDto) {
    return this.service.selectContext(raffleId, dto.sportId, dto.sportCategoryId);
  }

  @Post('draw/:raffleId/draw-team')
  @UseGuards(AdminJwtGuard)
  drawTeam(@Param('raffleId') raffleId: string) { return this.service.drawTeam(raffleId); }

  @Post('draw/:raffleId/draw-group')
  @UseGuards(AdminJwtGuard)
  drawGroup(@Param('raffleId') raffleId: string) { return this.service.drawGroup(raffleId); }

  @Post('draw/:raffleId/undo')
  @UseGuards(AdminJwtGuard)
  undoLast(@Param('raffleId') raffleId: string) { return this.service.undoLast(raffleId); }

  @Get('public/:publicSlug')
  getPublicResults(@Param('publicSlug') publicSlug: string) { return this.service.getPublicResults(publicSlug); }

  @Get('draw/by-slug/:drawSlug')
  @UseGuards(AdminJwtGuard)
  getRaffleByDrawSlug(@Param('drawSlug') drawSlug: string) { return this.service.getRaffleByDrawSlug(drawSlug); }
}