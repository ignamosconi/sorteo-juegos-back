import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRaffleTeamDto {
  @IsString() name!: string;
  @IsString() abbreviation!: string;
  @IsOptional() @IsString() imagePath?: string;
}

export class ImportGlobalTeamsDto {
  @IsUUID('4', { each: true }) globalTeamIds!: string[];
}