import { Body, Controller, Delete, BadRequestException, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { UploadImageResponseDto } from '../dtos/upload-image-response.dto.js';
import { DeleteImageDto } from '../dtos/delete-image.dto.js';
import { DeleteImageResponseDto } from '../dtos/delete-image-response.dto.js';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { IFileUploadController } from './interface/file-upload.controller.interface.js';

@Controller('uploads')
@UseGuards(AdminJwtGuard)
export class FileUploadController implements IFileUploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File): UploadImageResponseDto {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }
    return { path: `/uploads/${file.filename}` };
  }

  @Delete('image')
  deleteImage(@Body() dto: DeleteImageDto): DeleteImageResponseDto {
    const filename = dto.path.replace('/uploads/', '');
    const filePath = join(process.cwd(), 'public', 'uploads', filename);

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }

    return { success: true };
  }
}