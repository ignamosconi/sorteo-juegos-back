import { UploadImageResponseDto } from '../../dtos/upload-image-response.dto.js';
import { DeleteImageDto } from '../../dtos/delete-image.dto.js';
import { DeleteImageResponseDto } from '../../dtos/delete-image-response.dto.js';

export interface IFileUploadController {
  uploadImage(file: Express.Multer.File): UploadImageResponseDto | Promise<UploadImageResponseDto>;
  deleteImage(dto: DeleteImageDto): DeleteImageResponseDto | Promise<DeleteImageResponseDto>;
}