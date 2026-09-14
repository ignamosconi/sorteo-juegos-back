import { SportEntity } from '../../entities/sport.entity.js';
import { SportCategoryEntity } from '../../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../../entities/sport-category-team.entity.js';

export const SPORT_REPOSITORY = 'SPORT_REPOSITORY';

export interface ISportRepository {
  // Sports
  findByRaffle(raffleId: string): Promise<SportEntity[]>;
  findSportById(id: string): Promise<SportEntity | null>;
  createSport(data: Partial<SportEntity>): Promise<SportEntity>;
  updateSport(id: string, data: Partial<SportEntity>): Promise<SportEntity | null>;
  deleteSport(id: string): Promise<void>;

  // Categories
  findCategoriesBySport(sportId: string): Promise<SportCategoryEntity[]>;
  findCategoryById(id: string): Promise<SportCategoryEntity | null>;
  createCategory(data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity>;
  updateCategory(id: string, data: Partial<SportCategoryEntity>): Promise<SportCategoryEntity | null>;
  deleteCategory(id: string): Promise<void>;

  // Groups
  findGroups(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryGroupEntity[]>;
  findGroupById(id: string): Promise<SportCategoryGroupEntity | null>;
  createGroup(data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity>;
  createGroups(data: Partial<SportCategoryGroupEntity>[]): Promise<SportCategoryGroupEntity[]>;
  updateGroup(id: string, data: Partial<SportCategoryGroupEntity>): Promise<SportCategoryGroupEntity | null>;
  deleteGroup(id: string): Promise<void>;

  // Team assignments
  findAssignedTeams(sportId: string, sportCategoryId?: string | null): Promise<SportCategoryTeamEntity[]>;
  assignTeam(data: Partial<SportCategoryTeamEntity>): Promise<SportCategoryTeamEntity>;
  removeTeamAssignment(id: string): Promise<void>;
}