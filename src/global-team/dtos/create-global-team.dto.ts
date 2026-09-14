import { IsOptional, IsString } from 'class-validator';

export class CreateGlobalTeamDto {
  @IsString() name!: string;
  @IsString() abbreviation!: string;
  @IsOptional() @IsString() imagePath?: string;
}