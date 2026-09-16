import {
  Body,
  Controller,
  Delete,
  BadRequestException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminJwtGuard } from '../../admin-auth/guards/admin-jwt.guard.js';
import { UploadImageResponseDto } from '../dtos/upload-image-response.dto.js';
import { DeleteImageDto } from '../dtos/delete-image.dto.js';
import { DeleteImageResponseDto } from '../dtos/delete-image-response.dto.js';
import { IFileUploadController } from './interface/file-upload.controller.interface.js';
import { FILE_UPLOAD_SERVICE } from '../services/interfaces/file-upload.service.interface.js';
import type { IFileUploadService } from '../services/interfaces/file-upload.service.interface.js';

@Controller('uploads')
@UseGuards(AdminJwtGuard)
export class FileUploadController implements IFileUploadController {
  constructor(
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: IFileUploadService,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File): UploadImageResponseDto {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }
    return { path: `/uploads/${file.filename}` };
  }

  @Delete('image')
  async deleteImage(@Body() dto: DeleteImageDto): Promise<DeleteImageResponseDto> {
    await this.fileUploadService.deleteUnusedFile(dto.path);
    return { success: true };
  }

  @Delete('orphans')
  async cleanOrphans(): Promise<{ deletedCount: number }> {
    return this.fileUploadService.cleanOrphans();
  }
}