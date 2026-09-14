import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { RaffleService } from '../services/raffle.service.js';
import { CreateRaffleDto } from '../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../dtos/update-raffle.dto.js';

@Controller('raffles')
@UseGuards(AdminJwtGuard)
export class RaffleController {
  constructor(private readonly service: RaffleService) {}

  @Get()
  findAll(@Query('name') name?: string, @Query('sortByDate') sortByDate?: string) {
    return this.service.findAll({ name, sortByDate: sortByDate === 'true' });
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.service.findById(id); }
  @Post() create(@Body() dto: CreateRaffleDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateRaffleDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.delete(id); }
  @Post(':id/start') start(@Param('id') id: string) { return this.service.start(id); }
}