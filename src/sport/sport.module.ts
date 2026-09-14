import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEntity } from './entities/sport.entity.js';
import { SportCategoryEntity } from './entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from './entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from './entities/sport-category-team.entity.js';
import { SportRepository } from './repositories/sport.repository.js';
import { SportService } from './services/sport.service.js';
import { SportController } from './controllers/sport.controller.js';
import { SPORT_REPOSITORY } from './repositories/interfaces/sport.repository.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([SportEntity, SportCategoryEntity, SportCategoryGroupEntity, SportCategoryTeamEntity]),
    AuthGuardModule,
  ],
  controllers: [SportController],
  providers: [
    { provide: SPORT_REPOSITORY, useClass: SportRepository },
    SportService,
  ],
  exports: [SportService],
})
export class SportModule {}