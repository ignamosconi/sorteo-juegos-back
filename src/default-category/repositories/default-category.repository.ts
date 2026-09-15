import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultCategoryEntity } from '../entities/default-category.entity.js';
import { IDefaultCategoryRepository } from './interfaces/default-category.repository.interface.js';

@Injectable()
export class DefaultCategoryRepository implements IDefaultCategoryRepository {
  constructor(@InjectRepository(DefaultCategoryEntity) private readonly repo: Repository<DefaultCategoryEntity>) {}

  findAll(): Promise<DefaultCategoryEntity[]> {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  findById(id: string): Promise<DefaultCategoryEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<DefaultCategoryEntity>): Promise<DefaultCategoryEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<DefaultCategoryEntity>): Promise<DefaultCategoryEntity | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> { 
    await this.repo.delete(id);
  }
}