import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { CreateDefaultSportDto } from '../dtos/create-default-sport.dto.js';
import { UpdateDefaultSportDto } from '../dtos/update-default-sport.dto.js';
import { IDefaultSportController } from './interfaces/default-sport.controller.interface.js';
import type { IDefaultSportService } from '../services/interfaces/default-sport.service.interface.js';
import { DEFAULT_SPORT_SERVICE } from '../services/interfaces/default-sport.service.interface.js';
import { DefaultSportEntity } from '../entities/default-sport.entity.js';

@Controller('default-sports')
@UseGuards(AdminJwtGuard)
export class DefaultSportController implements IDefaultSportController {
  constructor(
    @Inject(DEFAULT_SPORT_SERVICE) private readonly service: IDefaultSportService,
  ) {}

  @Get()
  findAll(): Promise<DefaultSportEntity[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateDefaultSportDto): Promise<DefaultSportEntity> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDefaultSportDto,
  ): Promise<DefaultSportEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}