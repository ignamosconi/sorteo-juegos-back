import { RaffleTeamEntity } from '../../entities/raffle-team.entity.js';
import { CreateRaffleTeamDto, ImportGlobalTeamsDto } from '../../dtos/create-raffle-team.dto.js';
import { UpdateRaffleTeamDto } from '../../dtos/update-raffle-team.dto.js';

export interface IRaffleTeamController {
  findByRaffle(raffleId: string): Promise<RaffleTeamEntity[]>;
  create(raffleId: string, dto: CreateRaffleTeamDto): Promise<RaffleTeamEntity>;
  importFromGlobal(raffleId: string, dto: ImportGlobalTeamsDto): Promise<RaffleTeamEntity[]>;
  update(id: string, dto: UpdateRaffleTeamDto): Promise<RaffleTeamEntity>;
  remove(id: string): Promise<void>;
}