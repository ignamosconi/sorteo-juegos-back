import { DrawStateEntity } from '../../entities/draw-state.entity.js';
import { RaffleEntity } from '../../../raffle/entities/raffle.entity.js';
import { SelectContextDto } from '../../dtos/select-context.dto.js';
import { UndoDrawDto } from '../../dtos/undo-draw.dto.js';
import {
  DrawFullStateResponseDto,
  DrawTeamResponseDto,
  DrawGroupResponseDto,
  PublicResultsResponseDto,
} from '../../dtos/draw-response.dto.js';

export const DRAW_SERVICE = 'DRAW_SERVICE';

export interface IDrawService {
  getState(raffleId: string): Promise<DrawStateEntity | null>;
  getFullState(raffleId: string): Promise<DrawFullStateResponseDto>;
  selectContext(raffleId: string, dto: SelectContextDto): Promise<DrawFullStateResponseDto>;
  drawTeam(raffleId: string): Promise<DrawTeamResponseDto>;
  drawGroup(raffleId: string): Promise<DrawGroupResponseDto>;
  undoLast(raffleId: string, dto?: UndoDrawDto): Promise<DrawFullStateResponseDto>;
  getPublicResults(publicSlug: string): Promise<PublicResultsResponseDto>;
  getRaffleByDrawSlug(drawSlug: string): Promise<RaffleEntity>;
}