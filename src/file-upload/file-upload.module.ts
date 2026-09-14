import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
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
          // Genera un UUID impredecible: e.g. 9b1deb4d-3b7d-4bad-9bd2-2ca771600165.png
          const fileExtension = extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${fileExtension}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(extname(file.originalname))) {
          return cb(new Error('Solo se permiten archivos de imagen (JPG, PNG, WEBP, SVG)'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  ],
  controllers: [FileUploadController],
  exports: [MulterModule],
})
export class FileUploadModule {}