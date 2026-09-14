export interface IDrawController {
  getFullState(raffleId: string): Promise<unknown>;
  selectContext(raffleId: string, body: unknown): Promise<unknown>;
  drawTeam(raffleId: string): Promise<unknown>;
  drawGroup(raffleId: string): Promise<unknown>;
  undoLast(raffleId: string): Promise<unknown>;
  getPublicResults(publicSlug: string): Promise<unknown>;
}