import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { FileUploadController } from './controllers/file-upload.controller.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';

const uploadPath = join(process.cwd(), 'public', 'uploads');

@Module({
  imports: [
    AuthGuardModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(extname(file.originalname))) {
          return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  ],
  controllers: [FileUploadController],
  exports: [MulterModule],
})
export class FileUploadModule {}