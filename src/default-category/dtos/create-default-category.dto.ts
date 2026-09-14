import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateDefaultCategoryDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}