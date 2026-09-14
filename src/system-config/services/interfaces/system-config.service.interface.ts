import { SystemConfigEntity } from '../../entities/system-config.entity.js';
import { UpdateSystemConfigDto } from '../../dtos/update-system-config.dto.js';

export const SYSTEM_CONFIG_SERVICE = 'SYSTEM_CONFIG_SERVICE';

export interface ISystemConfigService {
  get(): Promise<SystemConfigEntity>;
  update(dto: UpdateSystemConfigDto): Promise<SystemConfigEntity>;
}