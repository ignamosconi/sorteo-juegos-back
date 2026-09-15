import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { FileUploadController } from './controllers/file-upload.controller.js';
import { AuthGuardModule } from '../common/auth-guard.module.js';
import { FileUploadService } from './services/file-upload.service.js';
import { FILE_UPLOAD_SERVICE } from './services/interfaces/file-upload.service.interface.js';

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
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  ],
  controllers: [FileUploadController],
  providers: [
    {
      provide: FILE_UPLOAD_SERVICE,
      useClass: FileUploadService,
    },
  ],
  exports: [MulterModule, FILE_UPLOAD_SERVICE],
})
export class FileUploadModule {}