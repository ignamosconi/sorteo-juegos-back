import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { DefaultCategoryService } from '../services/default-category.service.js';
import { CreateDefaultCategoryDto } from '../dtos/create-default-category.dto.js';
import { UpdateDefaultCategoryDto } from '../dtos/update-default-category.dto.js';
import { IDefaultCategoryController } from './interfaces/default-category.controller.interface.js';

@Controller('default-categories')
@UseGuards(AdminJwtGuard)
export class DefaultCategoryController implements IDefaultCategoryController {
  constructor(private readonly service: DefaultCategoryService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() dto: CreateDefaultCategoryDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateDefaultCategoryDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.delete(id); }
}