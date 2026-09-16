import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminJwtGuard } from '../admin-auth/guards/admin-jwt.guard.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.getOrThrow<string>('JWT_ADMIN_ACCESS_SECRET'),
      }),
    }),
  ],
  providers: [AdminJwtGuard],
  exports: [AdminJwtGuard, JwtModule],
})
export class AuthGuardModule {}