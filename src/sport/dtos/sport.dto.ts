import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSportDto {
  @IsString() name!: string;
  @IsString() abbreviation!: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class UpdateSportDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() abbreviation?: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class CreateSportCategoryDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class UpdateSportCategoryDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class CreateGroupDto {
  @IsString() name!: string;
  @IsOptional() @IsInt() @Min(1) capacity?: number;
  @IsOptional() @IsInt() @Min(0) sortOrder?: number;
}

export class BulkCreateGroupsDto {
  groups!: CreateGroupDto[];
}

export class UpdateGroupDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsInt() @Min(1) capacity?: number;
  @IsOptional() @IsInt() @Min(0) sortOrder?: number;
}

export class AssignTeamDto {
  @IsUUID() raffleTeamId!: string;
}