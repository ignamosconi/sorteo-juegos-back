import { DefaultCategoryEntity } from '../../entities/default-category.entity.js';

export const DEFAULT_CATEGORY_REPOSITORY = 'DEFAULT_CATEGORY_REPOSITORY';

export interface IDefaultCategoryRepository {
  findAll(): Promise<DefaultCategoryEntity[]>;
  findById(id: string): Promise<DefaultCategoryEntity | null>;
  create(data: Partial<DefaultCategoryEntity>): Promise<DefaultCategoryEntity>;
  update(id: string, data: Partial<DefaultCategoryEntity>): Promise<DefaultCategoryEntity | null>;
  delete(id: string): Promise<void>;
}