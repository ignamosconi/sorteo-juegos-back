import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultCategoryEntity } from './entities/default-category.entity.js';
import { DefaultCategoryRepository } from './repositories/default-category.repository.js';
import { DefaultCategoryService } from './services/default-category.service.js';
import { DefaultCategoryController } from './controllers/default-category.controller.js';
import { DEFAULT_CATEGORY_REPOSITORY } from './repositories/interfaces/default-category.repository.interface.js';
import { DEFAULT_CATEGORY_SERVICE } from './services/interfaces/default-category.service.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([DefaultCategoryEntity]), AuthGuardModule],
  controllers: [DefaultCategoryController],
  providers: [
    { provide: DEFAULT_CATEGORY_REPOSITORY, useClass: DefaultCategoryRepository },
    { provide: DEFAULT_CATEGORY_SERVICE, useClass: DefaultCategoryService },
  ],
  exports: [DEFAULT_CATEGORY_SERVICE],
})
export class DefaultCategoryModule {}