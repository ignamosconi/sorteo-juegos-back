import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateDefaultSportDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}