import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrawResultEntity } from './entities/draw-result.entity.js';
import { DrawStateEntity } from './entities/draw-state.entity.js';
import { DrawRepository } from './repositories/draw.repository.js';
import { DrawService } from './services/draw.service.js';
import { DrawController } from './controllers/draw.controller.js';
import { DRAW_REPOSITORY } from './repositories/interfaces/draw.repository.interface.js';
import { DRAW_SERVICE } from './services/interfaces/draw.service.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { SportModule } from '../sport/sport.module.js';
import { RaffleModule } from '../raffle/raffle.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([DrawResultEntity, DrawStateEntity]),
    AuthGuardModule,
    SportModule,
    RaffleModule,
  ],
  controllers: [DrawController],
  providers: [
    { provide: DRAW_REPOSITORY, useClass: DrawRepository },
    { provide: DRAW_SERVICE, useClass: DrawService },
  ],
  exports: [DRAW_SERVICE],
})
export class DrawModule {}