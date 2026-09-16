import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RaffleStatus } from '../entities/raffle.entity.js';

export class UpdateRaffleDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEnum(RaffleStatus) status?: RaffleStatus;
}