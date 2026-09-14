import { UploadImageResponseDto } from '../../dtos/upload-image-response.dto.js';

export interface IFileUploadController {
  uploadImage(file: Express.Multer.File): UploadImageResponseDto | Promise<UploadImageResponseDto>;
}