import { DrawResultEntity } from '../../entities/draw-result.entity.js';
import { DrawStateEntity } from '../../entities/draw-state.entity.js';

export const DRAW_REPOSITORY = 'DRAW_REPOSITORY';

export interface IDrawRepository {
  getState(raffleId: string): Promise<DrawStateEntity | null>;
  createState(raffleId: string): Promise<DrawStateEntity>;
  updateState(raffleId: string, data: Partial<DrawStateEntity>): Promise<DrawStateEntity>;
  getResults(raffleId: string): Promise<DrawResultEntity[]>;
  getResultsByGroup(sportCategoryGroupId: string): Promise<DrawResultEntity[]>;
  createResult(data: Partial<DrawResultEntity>): Promise<DrawResultEntity>;
  deleteResult(id: string): Promise<void>;
  getLastResult(
    raffleId: string,
    sportId?: string,
    sportCategoryId?: string | null,
  ): Promise<DrawResultEntity | null>;
}