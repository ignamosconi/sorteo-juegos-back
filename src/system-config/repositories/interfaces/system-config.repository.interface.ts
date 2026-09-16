import { SystemConfigEntity } from '../../entities/system-config.entity.js';

export const SYSTEM_CONFIG_REPOSITORY = 'SYSTEM_CONFIG_REPOSITORY';

export interface ISystemConfigRepository {
  get(): Promise<SystemConfigEntity>;
  update(data: Partial<SystemConfigEntity>): Promise<SystemConfigEntity>;
}