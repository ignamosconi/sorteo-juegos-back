import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DefaultSportEntity } from '../entities/default-sport.entity.js';
import { CreateDefaultSportDto } from '../dtos/create-default-sport.dto.js';
import { UpdateDefaultSportDto } from '../dtos/update-default-sport.dto.js';
import type { IDefaultSportRepository } from '../repositories/interfaces/default-sport.repository.interface.js';
import { DEFAULT_SPORT_REPOSITORY } from '../repositories/interfaces/default-sport.repository.interface.js';
import type { IDefaultSportService } from './interfaces/default-sport.service.interface.js';

@Injectable()
export class DefaultSportService implements IDefaultSportService {
  constructor(
    @Inject(DEFAULT_SPORT_REPOSITORY) private readonly repo: IDefaultSportRepository,
  ) {}

  findAll(): Promise<DefaultSportEntity[]> {
    return this.repo.findAll();
  }

  create(dto: CreateDefaultSportDto): Promise<DefaultSportEntity> {
    return this.repo.create({
      ...dto,
      order: dto.order ?? 0,
    });
  }

  async update(id: string, dto: UpdateDefaultSportDto): Promise<DefaultSportEntity> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Deporte por defecto no encontrado');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Deporte por defecto no encontrado');
    return this.repo.delete(id);
  }
}