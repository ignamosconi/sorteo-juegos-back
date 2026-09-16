import { Inject, Injectable } from '@nestjs/common';
import { SystemConfigEntity } from '../entities/system-config.entity.js';
import { UpdateSystemConfigDto } from '../dtos/update-system-config.dto.js';
import { SYSTEM_CONFIG_REPOSITORY } from '../repositories/interfaces/system-config.repository.interface.js';
import type { ISystemConfigRepository } from '../repositories/interfaces/system-config.repository.interface.js';
import type { ISystemConfigService } from './interfaces/system-config.service.interface.js';
import { FILE_UPLOAD_SERVICE } from '../../file-upload/services/interfaces/file-upload.service.interface.js';
import type { IFileUploadService } from '../../file-upload/services/interfaces/file-upload.service.interface.js';

@Injectable()
export class SystemConfigService implements ISystemConfigService {
  constructor(
    @Inject(SYSTEM_CONFIG_REPOSITORY)
    private readonly repo: ISystemConfigRepository,
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: IFileUploadService,
  ) {}

  get(): Promise<SystemConfigEntity> {
    return this.repo.get();
  }

  async update(dto: UpdateSystemConfigDto): Promise<SystemConfigEntity> {
    const current = await this.repo.get();
    const updated = await this.repo.update(dto);

    const imageFields: (keyof UpdateSystemConfigDto & keyof SystemConfigEntity)[] = [
      'navbarImagePath',
      'adminFaviconPath',
      'publicImagePath',
      'publicFaviconPath',
    ];

    for (const field of imageFields) {
      if (dto[field] !== undefined && current[field] && current[field] !== dto[field]) {
        await this.fileUploadService.deleteUnusedFile(current[field] as string);
      }
    }

    return updated;
  }
}