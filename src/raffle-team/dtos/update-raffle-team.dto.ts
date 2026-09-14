import { IsOptional, IsString } from 'class-validator';

export class UpdateRaffleTeamDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() abbreviation?: string;
  @IsOptional() @IsString() imagePath?: string;
}