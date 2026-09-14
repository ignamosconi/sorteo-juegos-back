import { SystemConfigEntity } from '../../entities/system-config.entity.js';
import { UpdateSystemConfigDto } from '../../dtos/update-system-config.dto.js';

export interface ISystemConfigController {
  get(): Promise<SystemConfigEntity>;
  getPublic(): Promise<SystemConfigEntity>;
  update(dto: UpdateSystemConfigDto): Promise<SystemConfigEntity>;
}