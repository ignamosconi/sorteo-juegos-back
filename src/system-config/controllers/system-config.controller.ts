import { Body, Controller, Get, Inject, Patch, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { UpdateSystemConfigDto } from '../dtos/update-system-config.dto.js';
import { ISystemConfigController } from './interfaces/system-config.controller.interface.js';
import type { ISystemConfigService } from '../services/interfaces/system-config.service.interface.js';
import { SYSTEM_CONFIG_SERVICE } from '../services/interfaces/system-config.service.interface.js';
import { SystemConfigEntity } from '../entities/system-config.entity.js';

@Controller('system-config')
export class SystemConfigController implements ISystemConfigController {
  constructor(
    @Inject(SYSTEM_CONFIG_SERVICE)
    private readonly service: ISystemConfigService,
  ) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  get(): Promise<SystemConfigEntity> {
    return this.service.get();
  }

  @Get('public')
  getPublic(): Promise<SystemConfigEntity> {
    return this.service.get();
  }

  @Patch()
  @UseGuards(AdminJwtGuard)
  update(@Body() dto: UpdateSystemConfigDto): Promise<SystemConfigEntity> {
    return this.service.update(dto);
  }
}