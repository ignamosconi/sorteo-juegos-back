import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleTeamEntity } from './entities/raffle-team.entity.js';
import { RaffleTeamRepository } from './repositories/raffle-team.repository.js';
import { RaffleTeamService } from './services/raffle-team.service.js';
import { RaffleTeamController } from './controllers/raffle-team.controller.js';
import { RAFFLE_TEAM_REPOSITORY } from './repositories/interfaces/raffle-team.repository.interface.js';
import { RAFFLE_TEAM_SERVICE } from './services/interfaces/raffle-team.service.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { GlobalTeamModule } from '../global-team/global-team.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([RaffleTeamEntity]), AuthGuardModule, GlobalTeamModule],
  controllers: [RaffleTeamController],
  providers: [
    { provide: RAFFLE_TEAM_REPOSITORY, useClass: RaffleTeamRepository },
    { provide: RAFFLE_TEAM_SERVICE, useClass: RaffleTeamService },
  ],
  exports: [RAFFLE_TEAM_SERVICE],
})
export class RaffleTeamModule {}