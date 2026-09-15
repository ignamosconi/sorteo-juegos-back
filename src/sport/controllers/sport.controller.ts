import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import {
  AssignTeamDto,
  BulkCreateGroupsDto,
  CreateSportCategoryDto,
  CreateSportDto,
  UpdateGroupDto,
  UpdateSportCategoryDto,
  UpdateSportDto,
} from '../dtos/sport.dto.js';
import { ISportController } from './interfaces/sport.controller.interface.js';
import type { ISportService } from '../services/interfaces/sport.service.interface.js';
import { SPORT_SERVICE } from '../services/interfaces/sport.service.interface.js';
import { SportEntity } from '../entities/sport.entity.js';
import { SportCategoryEntity } from '../entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from '../entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from '../entities/sport-category-team.entity.js';

@Controller()
@UseGuards(AdminJwtGuard)
export class SportController implements ISportController {
  constructor(@Inject(SPORT_SERVICE) private readonly service: ISportService) {}

  // Sports
  @Get('raffles/:raffleId/sports')
  findByRaffle(@Param('raffleId') raffleId: string): Promise<SportEntity[]> {
    return this.service.findByRaffle(raffleId);
  }

  @Post('raffles/:raffleId/sports')
    createSport(
      @Param('raffleId') raffleId: string,
      @Body() dto: CreateSportDto,
    ): Promise<SportEntity> {
      return this.service.createSport(raffleId, dto.name, dto.order);
    }

  @Patch('sports/:id')
  updateSport(@Param('id') id: string, @Body() dto: UpdateSportDto): Promise<SportEntity> {
    return this.service.updateSport(id, dto);
  }

  @Delete('sports/:id')
  deleteSport(@Param('id') id: string): Promise<void> {
    return this.service.deleteSport(id);
  }

  // Categories
  @Get('sports/:sportId/categories')
  findCategories(@Param('sportId') sportId: string): Promise<SportCategoryEntity[]> {
    return this.service.findCategories(sportId);
  }

  @Post('sports/:sportId/categories')
  createCategory(
    @Param('sportId') sportId: string,
    @Body() dto: CreateSportCategoryDto,
  ): Promise<SportCategoryEntity> {
    return this.service.createCategory(sportId, dto.name, dto.order);
  }

  @Patch('sport-categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateSportCategoryDto,
  ): Promise<SportCategoryEntity> {
    return this.service.updateCategory(id, dto);
  }

  @Delete('sport-categories/:id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.service.deleteCategory(id);
  }

  // Groups
  @Get('sports/:sportId/groups')
  findGroups(
    @Param('sportId') sportId: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<SportCategoryGroupEntity[]> {
    return this.service.findGroups(sportId, categoryId ?? null);
  }

  @Post('sports/:sportId/groups')
  createGroups(
    @Param('sportId') sportId: string,
    @Body() dto: BulkCreateGroupsDto,
    @Query('categoryId') categoryId?: string,
  ): Promise<SportCategoryGroupEntity[]> {
    return this.service.createGroups(
      sportId,
      categoryId ?? null,
      dto.groups.map((g) => ({ name: g.name, capacity: g.capacity ?? 4 })),
    );
  }

  @Patch('sport-groups/:id')
  updateGroup(@Param('id') id: string, @Body() dto: UpdateGroupDto): Promise<SportCategoryGroupEntity> {
    return this.service.updateGroup(id, dto);
  }

  @Delete('sport-groups/:id')
  deleteGroup(@Param('id') id: string): Promise<void> {
    return this.service.deleteGroup(id);
  }

  // Team assignments
  @Get('sports/:sportId/assigned-teams')
  findAssignedTeams(
    @Param('sportId') sportId: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<SportCategoryTeamEntity[]> {
    return this.service.findAssignedTeams(sportId, categoryId ?? null);
  }

  @Post('sports/:sportId/assign-team')
  assignTeam(
    @Param('sportId') sportId: string,
    @Body() dto: AssignTeamDto,
    @Query('categoryId') categoryId?: string,
  ): Promise<SportCategoryTeamEntity> {
    return this.service.assignTeam(sportId, categoryId ?? null, dto.raffleTeamId);
  }

  @Delete('sport-category-teams/:id')
  removeTeamAssignment(@Param('id') id: string): Promise<void> {
    return this.service.removeTeamAssignment(id);
  }
}