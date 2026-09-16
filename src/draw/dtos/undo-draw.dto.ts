import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UndoDrawDto {
  @IsOptional()
  @IsUUID()
  sportId?: string;

  @IsOptional()
  @IsString()
  sportCategoryId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}