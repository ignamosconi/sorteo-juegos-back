export interface ISportController {
  findByRaffle(raffleId: string): Promise<unknown>;
  createSport(raffleId: string, body: unknown): Promise<unknown>;
  updateSport(id: string, body: unknown): Promise<unknown>;
  deleteSport(id: string): Promise<void>;
}