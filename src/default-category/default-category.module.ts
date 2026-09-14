import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultCategoryEntity } from './entities/default-category.entity.js';
import { DefaultCategoryRepository } from './repositories/default-category.repository.js';
import { DefaultCategoryService } from './services/default-category.service.js';
import { DefaultCategoryController } from './controllers/default-category.controller.js';
import { DEFAULT_CATEGORY_REPOSITORY } from './repositories/interfaces/default-category.repository.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([DefaultCategoryEntity]), AuthGuardModule],
  controllers: [DefaultCategoryController],
  providers: [
    { provide: DEFAULT_CATEGORY_REPOSITORY, useClass: DefaultCategoryRepository },
    DefaultCategoryService,
  ],
  exports: [DefaultCategoryService],
})
export class DefaultCategoryModule {}