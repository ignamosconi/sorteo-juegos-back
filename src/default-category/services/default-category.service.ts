import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DefaultCategoryEntity } from '../entities/default-category.entity.js';
import { CreateDefaultCategoryDto } from '../dtos/create-default-category.dto.js';
import { UpdateDefaultCategoryDto } from '../dtos/update-default-category.dto.js';
import type { IDefaultCategoryRepository } from '../repositories/interfaces/default-category.repository.interface.js';
import { DEFAULT_CATEGORY_REPOSITORY } from '../repositories/interfaces/default-category.repository.interface.js';

@Injectable()
export class DefaultCategoryService {
  constructor(@Inject(DEFAULT_CATEGORY_REPOSITORY) private readonly repo: IDefaultCategoryRepository) {}

  findAll(): Promise<DefaultCategoryEntity[]> { return this.repo.findAll(); }

  create(dto: CreateDefaultCategoryDto): Promise<DefaultCategoryEntity> {
    return this.repo.create({ name: dto.name, order: dto.order ?? 0 });
  }

  async update(id: string, dto: UpdateDefaultCategoryDto): Promise<DefaultCategoryEntity> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Categoría no encontrada');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Categoría no encontrada');
    return this.repo.delete(id);
  }
}