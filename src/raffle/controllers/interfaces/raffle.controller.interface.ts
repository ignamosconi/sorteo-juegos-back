import { RaffleEntity } from '../../entities/raffle.entity.js';
import { CreateRaffleDto } from '../../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../../dtos/update-raffle.dto.js';

export interface IRaffleController {
  findAll(name?: string, sortByDate?: boolean): Promise<RaffleEntity[]>;
  findOne(id: string): Promise<RaffleEntity>;
  create(dto: CreateRaffleDto): Promise<RaffleEntity>;
  update(id: string, dto: UpdateRaffleDto): Promise<RaffleEntity>;
  remove(id: string): Promise<void>;
  start(id: string): Promise<RaffleEntity>;
}