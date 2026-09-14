import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleEntity } from './entities/raffle.entity.js';
import { RaffleRepository } from './repositories/raffle.repository.js';
import { RaffleService } from './services/raffle.service.js';
import { RaffleController } from './controllers/raffle.controller.js';
import { RAFFLE_REPOSITORY } from './repositories/interfaces/raffle.repository.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([RaffleEntity]), AuthGuardModule],
  controllers: [RaffleController],
  providers: [
    { provide: RAFFLE_REPOSITORY, useClass: RaffleRepository },
    RaffleService,
  ],
  exports: [RaffleService],
})
export class RaffleModule {}