import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { RaffleEntity, RaffleStatus } from '../entities/raffle.entity.js';
import { CreateRaffleDto } from '../dtos/create-raffle.dto.js';
import { UpdateRaffleDto } from '../dtos/update-raffle.dto.js';
import { GetRafflesFilterDto } from '../dtos/get-raffles-filter.dto.js';
import type { IRaffleRepository } from '../repositories/interfaces/raffle.repository.interface.js';
import { RAFFLE_REPOSITORY } from '../repositories/interfaces/raffle.repository.interface.js';
import type { IRaffleService } from './interfaces/raffle.service.interface.js';
import { RAFFLE_TEAM_SERVICE } from '../../raffle-team/services/interfaces/raffle-team.service.interface.js';
import type { IRaffleTeamService } from '../../raffle-team/services/interfaces/raffle-team.service.interface.js';
import { FILE_UPLOAD_SERVICE } from '../../file-upload/services/interfaces/file-upload.service.interface.js';
import type { IFileUploadService } from '../../file-upload/services/interfaces/file-upload.service.interface.js';

@Injectable()
export class RaffleService implements IRaffleService {
  constructor(
    @Inject(RAFFLE_REPOSITORY) private readonly repo: IRaffleRepository,
    @Inject(RAFFLE_TEAM_SERVICE) private readonly raffleTeamService: IRaffleTeamService,
    @Inject(FILE_UPLOAD_SERVICE) private readonly fileUploadService: IFileUploadService,
  ) {}

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
    const found = await this.findById(id);
    if (!found) throw new NotFoundException('Sorteo no encontrado');

    const raffleTeams = await this.raffleTeamService.findByRaffle(id);

    await this.repo.delete(id);

    for (const team of raffleTeams) {
      if (team.imagePath) {
        await this.fileUploadService.deleteUnusedFile(team.imagePath);
      }
    }
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