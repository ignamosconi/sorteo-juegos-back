import { SportEntity } from '../../entities/sport.entity.js';
import { SportCategoryEntity } from '../../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../../entities/sport-category-team.entity.js';
import {
  AssignTeamDto,
  BulkCreateGroupsDto,
  CreateSportCategoryDto,
  CreateSportDto,
  UpdateGroupDto,
  UpdateSportCategoryDto,
  UpdateSportDto,
} from '../../dtos/sport.dto.js';

export interface ISportController {
  // Sports
  findByRaffle(raffleId: string): Promise<SportEntity[]>;
  createSport(raffleId: string, dto: CreateSportDto): Promise<SportEntity>;
  updateSport(id: string, dto: UpdateSportDto): Promise<SportEntity>;
  deleteSport(id: string): Promise<void>;

  // Categories
  findCategories(sportId: string): Promise<SportCategoryEntity[]>;
  createCategory(sportId: string, dto: CreateSportCategoryDto): Promise<SportCategoryEntity>;
  updateCategory(id: string, dto: UpdateSportCategoryDto): Promise<SportCategoryEntity>;
  deleteCategory(id: string): Promise<void>;

  // Groups
  findGroups(sportId: string, categoryId?: string): Promise<SportCategoryGroupEntity[]>;
  createGroups(sportId: string, dto: BulkCreateGroupsDto, categoryId?: string): Promise<SportCategoryGroupEntity[]>;
  updateGroup(id: string, dto: UpdateGroupDto): Promise<SportCategoryGroupEntity>;
  deleteGroup(id: string): Promise<void>;

  // Team assignments
  findAssignedTeams(sportId: string, categoryId?: string): Promise<SportCategoryTeamEntity[]>;
  assignTeam(sportId: string, dto: AssignTeamDto, categoryId?: string): Promise<SportCategoryTeamEntity>;
  removeTeamAssignment(id: string): Promise<void>;
}