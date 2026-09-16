import { DefaultCategoryEntity } from '../../entities/default-category.entity.js';
import { CreateDefaultCategoryDto } from '../../dtos/create-default-category.dto.js';
import { UpdateDefaultCategoryDto } from '../../dtos/update-default-category.dto.js';

export const DEFAULT_CATEGORY_SERVICE = 'DEFAULT_CATEGORY_SERVICE';

export interface IDefaultCategoryService {
  findAll(): Promise<DefaultCategoryEntity[]>;
  create(dto: CreateDefaultCategoryDto): Promise<DefaultCategoryEntity>;
  update(id: string, dto: UpdateDefaultCategoryDto): Promise<DefaultCategoryEntity>;
  delete(id: string): Promise<void>;
}