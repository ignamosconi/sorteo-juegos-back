import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfigEntity } from './entities/system-config.entity.js';
import { SystemConfigRepository } from './repositories/system-config.repository.js';
import { SystemConfigService } from './services/system-config.service.js';
import { SystemConfigController } from './controllers/system-config.controller.js';
import { SYSTEM_CONFIG_REPOSITORY } from './repositories/interfaces/system-config.repository.interface.js';
import { SYSTEM_CONFIG_SERVICE } from './services/interfaces/system-config.service.interface.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { FileUploadModule } from '../file-upload/file-upload.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemConfigEntity]),
    AuthGuardModule,
    FileUploadModule,
  ],
  controllers: [SystemConfigController],
  providers: [
    { provide: SYSTEM_CONFIG_REPOSITORY, useClass: SystemConfigRepository },
    { provide: SYSTEM_CONFIG_SERVICE, useClass: SystemConfigService },
  ],
  exports: [SYSTEM_CONFIG_SERVICE],
})
export class SystemConfigModule {}