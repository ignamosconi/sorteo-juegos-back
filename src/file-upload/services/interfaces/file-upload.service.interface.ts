export const FILE_UPLOAD_SERVICE = 'FILE_UPLOAD_SERVICE';

export interface IFileUploadService {
  deleteFile(path: string): void;
  deleteUnusedFile(path: string): Promise<void>;
  cleanOrphans(): Promise<{ deletedCount: number }>;
}