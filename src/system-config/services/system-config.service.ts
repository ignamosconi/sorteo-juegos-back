import { Inject, Injectable } from '@nestjs/common';
import { SystemConfigEntity } from '../entities/system-config.entity.js';
import { UpdateSystemConfigDto } from '../dtos/update-system-config.dto.js';
import { SYSTEM_CONFIG_REPOSITORY } from '../repositories/interfaces/system-config.repository.interface.js';
import type { ISystemConfigRepository } from '../repositories/interfaces/system-config.repository.interface.js';
import type { ISystemConfigService } from './interfaces/system-config.service.interface.js';

@Injectable()
export class SystemConfigService implements ISystemConfigService {
  constructor(
    @Inject(SYSTEM_CONFIG_REPOSITORY)
    private readonly repo: ISystemConfigRepository,
  ) {}

  get(): Promise<SystemConfigEntity> {
    return this.repo.get();
  }

  update(dto: UpdateSystemConfigDto): Promise<SystemConfigEntity> {
    return this.repo.update(dto);
  }
}