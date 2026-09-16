import { IsOptional, IsString } from 'class-validator';

export class UpdateGlobalTeamDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() abbreviation?: string;
  @IsOptional() @IsString() imagePath?: string;
}