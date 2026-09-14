import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { RaffleEntity, RaffleStatus } from '../entities/raffle.entity.js';
import { CreateRaffleDto } from '../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../dtos/update-raffle.dto.js';
import { GetRafflesFilterDto } from '../dtos/get-raffles-filter.dto.js';
import type { IRaffleRepository } from '../repositories/interfaces/raffle.repository.interface.js';
import { RAFFLE_REPOSITORY } from '../repositories/interfaces/raffle.repository.interface.js';
import type { IRaffleService } from './interfaces/raffle.service.interface.js';

@Injectable()
export class RaffleService implements IRaffleService {
  constructor(@Inject(RAFFLE_REPOSITORY) private readonly repo: IRaffleRepository) {}

  findAll(filters?: GetRafflesFilterDto): Promise<RaffleEntity[]> {
    return this.repo.findAll(filters);
  }

  async findById(id: string): Promise<RaffleEntity> {
    const raffle = await this.repo.findById(id);
    if (!raffle) throw new NotFoundException('Sorteo no encontrado');
    return raffle;
  }

  create(dto: CreateRaffleDto): Promise<RaffleEntity> {
    return this.repo.create({ name: dto.name, status: RaffleStatus.PENDING });
  }

  async update(id: string, dto: UpdateRaffleDto): Promise<RaffleEntity> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Sorteo no encontrado');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Sorteo no encontrado');
    return this.repo.delete(id);
  }

  async start(id: string): Promise<RaffleEntity> {
    const raffle = await this.findById(id);
    if (raffle.status !== RaffleStatus.PENDING && raffle.status !== RaffleStatus.CONFIGURED) {
      throw new BadRequestException('El sorteo ya fue iniciado o finalizado');
    }
    const publicSlug = randomBytes(6).toString('hex');
    const drawSlug = randomBytes(8).toString('hex');
    const updated = await this.repo.update(id, {
      status: RaffleStatus.IN_PROGRESS,
      publicSlug,
      drawSlug,
    });
    return updated!;
  }
}