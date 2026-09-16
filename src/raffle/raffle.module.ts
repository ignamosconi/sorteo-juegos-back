import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleEntity } from './entities/raffle.entity.js';
import { RaffleRepository } from './repositories/raffle.repository.js';
import { RaffleService } from './services/raffle.service.js';
import { RaffleController } from './controllers/raffle.controller.js';
import { RAFFLE_REPOSITORY } from './repositories/interfaces/raffle.repository.interface.js';
import { RAFFLE_SERVICE } from './services/interfaces/raffle.service.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { RaffleTeamModule } from '../raffle-team/raffle-team.module.js';
import { FileUploadModule } from '../file-upload/file-upload.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaffleEntity]),
    AuthGuardModule,
    RaffleTeamModule,
    FileUploadModule,
  ],
  controllers: [RaffleController],
  providers: [
    { provide: RAFFLE_REPOSITORY, useClass: RaffleRepository },
    { provide: RAFFLE_SERVICE, useClass: RaffleService },
  ],
  exports: [RAFFLE_SERVICE],
})
export class RaffleModule {}