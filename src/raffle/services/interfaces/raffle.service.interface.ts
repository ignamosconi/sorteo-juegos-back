import { RaffleEntity } from '../../entities/raffle.entity.js';
import { CreateRaffleDto } from '../../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../../dtos/update-raffle.dto.js';
import { GetRafflesFilterDto } from '../../dtos/get-raffles-filter.dto.js';

export const RAFFLE_SERVICE = 'RAFFLE_SERVICE';

export interface IRaffleService {
  findAll(filters?: GetRafflesFilterDto): Promise<RaffleEntity[]>;
  findById(id: string): Promise<RaffleEntity>;
  create(dto: CreateRaffleDto): Promise<RaffleEntity>;
  update(id: string, dto: UpdateRaffleDto): Promise<RaffleEntity>;
  delete(id: string): Promise<void>;
  start(id: string): Promise<RaffleEntity>;
}