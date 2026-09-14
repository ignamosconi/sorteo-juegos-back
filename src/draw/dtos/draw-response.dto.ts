import { DrawStateEntity } from '../entities/draw-state.entity.js';
import { DrawResultEntity } from '../entities/draw-result.entity.js';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';

export class DrawFullStateResponseDto {
  state!: DrawStateEntity | null;
  remainingTeams!: unknown[];
  remainingGroups!: unknown[];
  results!: DrawResultEntity[];
}

export class DrawTeamResponseDto {
  team!: { id: string; [key: string]: unknown };
  state!: DrawStateEntity | null;
}

export class DrawGroupResponseDto {
  result!: DrawResultEntity;
  isDone!: boolean;
}

export class PublicGroupDataDto {
  results!: DrawResultEntity[];
  [key: string]: unknown;
}

export class PublicSectionDataDto {
  category!: unknown | null;
  groups!: PublicGroupDataDto[];
}

export class PublicSportDataDto {
  sport!: unknown;
  hasCategories!: boolean;
  sections!: PublicSectionDataDto[];
}

export class PublicResultsResponseDto {
  raffle!: RaffleEntity;
  sports!: PublicSportDataDto[];
}