import { IsOptional, IsString } from 'class-validator';

export class UpdateRaffleDto {
  @IsOptional() @IsString() name?: string;
}