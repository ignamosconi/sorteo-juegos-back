import { SelectContextDto } from '../../dtos/select-context.dto.js';
import {
  DrawFullStateResponseDto,
  DrawTeamResponseDto,
  DrawGroupResponseDto,
  PublicResultsResponseDto,
} from '../../dtos/draw-response.dto.js';
import { RaffleEntity } from '../../../raffle/entities/raffle.entity.js';

export interface IDrawController {
  getFullState(raffleId: string): Promise<DrawFullStateResponseDto>;
  selectContext(raffleId: string, dto: SelectContextDto): Promise<DrawFullStateResponseDto>;
  drawTeam(raffleId: string): Promise<DrawTeamResponseDto>;
  drawGroup(raffleId: string): Promise<DrawGroupResponseDto>;
  undoLast(raffleId: string): Promise<DrawFullStateResponseDto>;
  getPublicResults(publicSlug: string): Promise<PublicResultsResponseDto>;
  getRaffleByDrawSlug(drawSlug: string): Promise<RaffleEntity>;
}