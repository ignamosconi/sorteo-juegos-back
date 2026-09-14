import { SportEntity } from '../../entities/sport.entity.js';
import { SportCategoryEntity } from '../../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../../entities/sport-category-team.entity.js';

export const SPORT_SERVICE = 'SPORT_SERVICE';

export interface ISportService {
  findByRaffle(raffleId: string): Promise<SportEntity[]>;
  createSport(raffleId: string, name: string, abbreviation: string, order?: number): Promise<SportEntity>;
  updateSport(id: string, data: Partial<SportEntity>): Promise<SportEntity>;
  deleteSport(id: string): Promise<void>;

  findCategories(sportId: string): Promise<SportCategoryEntity[]>;
  createCategory(sportId: string, name: string, order?: number): Promise<SportCategoryEntity>;
  updateCategory(id: string, data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity>;
  deleteCategory(id: string): Promise<void>;

  findGroups(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryGroupEntity[]>;
  createGroups(sportId: string, sportCategoryId: string | null, groups: { name: string; capacity: number }[]): Promise<SportCategoryGroupEntity[]>;
  updateGroup(id: string, data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity>;
  deleteGroup(id: string): Promise<void>;

  findAssignedTeams(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryTeamEntity[]>;
  assignTeam(sportId: string, sportCategoryId: string | null, raffleTeamId: string): Promise<SportCategoryTeamEntity>;
  removeTeamAssignment(id: string): Promise<void>;
}