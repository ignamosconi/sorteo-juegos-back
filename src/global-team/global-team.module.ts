import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalTeamEntity } from './entities/global-team.entity.js';
import { GlobalTeamRepository } from './repositories/global-team.repository.js';
import { GlobalTeamService } from './services/global-team.service.js';
import { GlobalTeamController } from './controllers/global-team.controller.js';
import { GLOBAL_TEAM_REPOSITORY } from './repositories/interfaces/global-team.repository.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalTeamEntity]), AuthGuardModule],
  controllers: [GlobalTeamController],
  providers: [
    { provide: GLOBAL_TEAM_REPOSITORY, useClass: GlobalTeamRepository },
    GlobalTeamService,
  ],
  exports: [GlobalTeamService],
})
export class GlobalTeamModule {}