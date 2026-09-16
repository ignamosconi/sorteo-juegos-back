import { IsString } from 'class-validator';

export class CreateRaffleDto {
  @IsString() name!: string;
}