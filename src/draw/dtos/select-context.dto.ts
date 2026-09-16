import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SelectContextDto {
  @IsUUID()
  sportId!: string;

  @IsOptional()
  @IsString()
  sportCategoryId?: string;
}