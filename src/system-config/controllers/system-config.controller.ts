import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { SystemConfigService } from '../services/system-config.service.js';
import { UpdateSystemConfigDto } from '../dtos/update-system-config.dto.js';
import { ISystemConfigController } from './interfaces/system-config.controller.interface.js';

@Controller('system-config')
export class SystemConfigController implements ISystemConfigController {
  constructor(private readonly service: SystemConfigService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  get() { return this.service.get(); }

  @Get('public')
  getPublic() { return this.service.get(); }

  @Patch()
  @UseGuards(AdminJwtGuard)
  update(@Body() dto: UpdateSystemConfigDto) { return this.service.update(dto); }
}