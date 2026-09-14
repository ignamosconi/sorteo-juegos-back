import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { IFileUploadController } from './interface/file-upload.controller.interface.js';
import { UploadImageResponseDto } from '../dtos/upload-image-response.dto.js';

@Controller('uploads')
@UseGuards(AdminJwtGuard)
export class FileUploadController implements IFileUploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File): UploadImageResponseDto {
    return { path: `/app/uploads/${file.filename}` };
  }
}