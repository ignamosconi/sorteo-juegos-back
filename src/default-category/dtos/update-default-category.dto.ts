import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateDefaultCategoryDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}