import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { DefaultSportEntity } from './entities/default-sport.entity.js';
import { DefaultSportController } from './controllers/default-sport.controller.js';
import { DefaultSportService } from './services/default-sport.service.js';
import { DefaultSportRepository } from './repositories/default-sport.repository.js';
import { DEFAULT_SPORT_SERVICE } from './services/interfaces/default-sport.service.interface.js';
import { DEFAULT_SPORT_REPOSITORY } from './repositories/interfaces/default-sport.repository.interface.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([DefaultSportEntity]),
    AuthGuardModule, // <--- Agregar esta línea
  ],
  controllers: [DefaultSportController],
  providers: [
    {
      provide: DEFAULT_SPORT_SERVICE,
      useClass: DefaultSportService,
    },
    {
      provide: DEFAULT_SPORT_REPOSITORY,
      useClass: DefaultSportRepository,
    },
  ],
  exports: [DEFAULT_SPORT_SERVICE],
})
export class DefaultSportModule {}