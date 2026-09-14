import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminJwtGuard } from '../admin-auth/guards/admin-jwt.guard.js';

@Controller('uploads')
@UseGuards(AdminJwtGuard)
export class FileUploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { path: `/app/uploads/${file.filename}` };
  }
}