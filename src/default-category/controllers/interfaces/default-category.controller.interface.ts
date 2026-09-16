import { DefaultCategoryEntity } from '../../entities/default-category.entity.js';
import { CreateDefaultCategoryDto } from '../../dtos/create-default-category.dto.js';
import { UpdateDefaultCategoryDto } from '../../dtos/update-default-category.dto.js';

export interface IDefaultCategoryController {
  findAll(): Promise<DefaultCategoryEntity[]>;
  create(dto: CreateDefaultCategoryDto): Promise<DefaultCategoryEntity>;
  update(id: string, dto: UpdateDefaultCategoryDto): Promise<DefaultCategoryEntity>;
  remove(id: string): Promise<void>;
}