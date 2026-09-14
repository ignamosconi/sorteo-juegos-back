import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfigEntity } from '../entities/system-config.entity.js';
import { ISystemConfigRepository } from './interfaces/system-config.repository.interface.js';

@Injectable()
export class SystemConfigRepository implements ISystemConfigRepository {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private readonly repo: Repository<SystemConfigEntity>,
  ) {}

  async get(): Promise<SystemConfigEntity> {
    let cfg = await this.repo.findOne({ where: { id: 1 } });
    if (!cfg) {
      cfg = this.repo.create({ id: 1 });
      await this.repo.save(cfg);
    }
    return cfg;
  }

  async update(data: Partial<SystemConfigEntity>): Promise<SystemConfigEntity> {
    await this.repo.save({ ...data, id: 1 });
    return this.get();
  }
}