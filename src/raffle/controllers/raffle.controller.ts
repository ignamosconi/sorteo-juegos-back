import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { CreateRaffleDto } from '../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../dtos/update-raffle.dto.js';
import { IRaffleController } from './interfaces/raffle.controller.interface.js';
import type { IRaffleService } from '../services/interfaces/raffle.service.interface.js';
import { RAFFLE_SERVICE } from '../services/interfaces/raffle.service.interface.js';
import { RaffleEntity } from '../entities/raffle.entity.js';

@Controller('raffles')
@UseGuards(AdminJwtGuard)
export class RaffleController implements IRaffleController {
  constructor(@Inject(RAFFLE_SERVICE) private readonly service: IRaffleService) {}

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('sortByDate') sortByDate?: string,
  ): Promise<RaffleEntity[]> {
    return this.service.findAll({ name, sortByDate: sortByDate === 'true' });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RaffleEntity> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateRaffleDto): Promise<RaffleEntity> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRaffleDto): Promise<RaffleEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Post(':id/start')
  start(@Param('id') id: string): Promise<RaffleEntity> {
    return this.service.start(id);
  }
}