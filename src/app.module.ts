import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RedisModule } from './redis/redis.module.js';
import { AdminModule } from './admin/admin.module.js';
import { AdminAuthModule } from './admin-auth/admin-auth.module.js';
import { AdminEntity } from './admin/entities/admin.entity.js';
import { RefreshTokenEntity } from './refresh-token/entities/refresh-token.entity.js';
import { AdminSeeder } from './database/seeders/admin.seeder.js';
import { SystemConfigModule } from './system-config/system-config.module.js';
import { SystemConfigEntity } from './system-config/entities/system-config.entity.js';
import { DefaultCategoryModule } from './default-category/default-category.module.js';
import { DefaultCategoryEntity } from './default-category/entities/default-category.entity.js';
import { GlobalTeamModule } from './global-team/global-team.module.js';
import { GlobalTeamEntity } from './global-team/entities/global-team.entity.js';
import { RaffleModule } from './raffle/raffle.module.js';
import { RaffleEntity } from './raffle/entities/raffle.entity.js';
import { RaffleTeamModule } from './raffle-team/raffle-team.module.js';
import { RaffleTeamEntity } from './raffle-team/entities/raffle-team.entity.js';
import { SportModule } from './sport/sport.module.js';
import { SportEntity } from './sport/entities/sport.entity.js';
import { SportCategoryEntity } from './sport/entities/sport-category.entity.js';
import { SportCategoryGroupEntity } from './sport/entities/sport-category-group.entity.js';
import { SportCategoryTeamEntity } from './sport/entities/sport-category-team.entity.js';
import { DrawModule } from './draw/draw.module.js';
import { DrawResultEntity } from './draw/entities/draw-result.entity.js';
import { DrawStateEntity } from './draw/entities/draw-state.entity.js';
import { FileUploadModule } from './file-upload/file-upload.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/app',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [
          AdminEntity, RefreshTokenEntity,
          SystemConfigEntity, DefaultCategoryEntity, GlobalTeamEntity,
          RaffleEntity, RaffleTeamEntity,
          SportEntity, SportCategoryEntity, SportCategoryGroupEntity, SportCategoryTeamEntity,
          DrawResultEntity, DrawStateEntity,
        ],
        synchronize: false,
        migrations: [join(__dirname, 'database', 'migrations', '*.js')],
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([AdminEntity]),
    ThrottlerModule.forRoot([{ name: 'global', ttl: 60000, limit: 3000 }]),
    AdminModule,
    AdminAuthModule,
    SystemConfigModule,
    DefaultCategoryModule,
    GlobalTeamModule,
    FileUploadModule,
    RaffleModule,
    RaffleTeamModule,
    SportModule,
    DrawModule,
  ],
  providers: [
    AdminSeeder,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}