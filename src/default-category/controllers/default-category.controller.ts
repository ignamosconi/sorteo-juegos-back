import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { CreateDefaultCategoryDto } from '../dtos/create-default-category.dto.js';
import { UpdateDefaultCategoryDto } from '../dtos/update-default-category.dto.js';
import { IDefaultCategoryController } from './interfaces/default-category.controller.interface.js';
import type { IDefaultCategoryService } from '../services/interfaces/default-category.service.interface.js';
import { DEFAULT_CATEGORY_SERVICE } from '../services/interfaces/default-category.service.interface.js';
import { DefaultCategoryEntity } from '../entities/default-category.entity.js';

@Controller('default-categories')
@UseGuards(AdminJwtGuard)
export class DefaultCategoryController implements IDefaultCategoryController {
  constructor(
    @Inject(DEFAULT_CATEGORY_SERVICE) private readonly service: IDefaultCategoryService,
  ) {}

  @Get()
  findAll(): Promise<DefaultCategoryEntity[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateDefaultCategoryDto): Promise<DefaultCategoryEntity> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDefaultCategoryDto,
  ): Promise<DefaultCategoryEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}