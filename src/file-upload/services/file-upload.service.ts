import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import type { IFileUploadService } from './interfaces/file-upload.service.interface.js';
import { GlobalTeamEntity } from '../../global-team/entities/global-team.entity.js';
import { SystemConfigEntity } from '../../system-config/entities/system-config.entity.js';
import { RaffleTeamEntity } from '../../raffle-team/entities/raffle-team.entity.js';

@Injectable()
export class FileUploadService implements IFileUploadService {
  constructor(private readonly dataSource: DataSource) {}

  deleteFile(path: string | null | undefined): void {
    if (!path) return;
    const filename = path.replace('/uploads/', '').replace('/uploads', '');
    if (!filename) return;

    const filePath = join(process.cwd(), 'public', 'uploads', filename);
    if (existsSync(filePath)) {
      try {
        unlinkSync(filePath);
      } catch (err) {
        console.error(`Error al eliminar archivo ${filePath}:`, err);
      }
    }
  }

  async deleteUnusedFile(path: string | null | undefined): Promise<void> {
    if (!path) return;

    const [globalCount, configCount, raffleTeamCount] = await Promise.all([
      this.dataSource.getRepository(GlobalTeamEntity).count({ where: { imagePath: path } }),
      this.dataSource.getRepository(SystemConfigEntity).count({
        where: [
          { navbarImagePath: path },
          { adminFaviconPath: path },
          { publicImagePath: path },
          { publicFaviconPath: path },
        ],
      }),
      this.dataSource.getRepository(RaffleTeamEntity).count({ where: { imagePath: path } }),
    ]);

    const totalUsage = globalCount + configCount + raffleTeamCount;

    if (totalUsage === 0) {
      this.deleteFile(path);
    }
  }

  async cleanOrphans(): Promise<{ deletedCount: number }> {
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) return { deletedCount: 0 };

    const filesInDisk = readdirSync(uploadDir);

    const globalTeams = await this.dataSource.getRepository(GlobalTeamEntity).find({ select: { imagePath: true } });
    const raffleTeams = await this.dataSource.getRepository(RaffleTeamEntity).find({ select: { imagePath: true } });
    const configs = await this.dataSource.getRepository(SystemConfigEntity).find({
      select: {
        navbarImagePath: true,
        adminFaviconPath: true,
        publicImagePath: true,
        publicFaviconPath: true,
      },
    });

    const usedPaths = new Set<string>();

    globalTeams.forEach((t) => t.imagePath && usedPaths.add(t.imagePath));
    raffleTeams.forEach((t) => t.imagePath && usedPaths.add(t.imagePath));
    configs.forEach((c) => {
      if (c.navbarImagePath) usedPaths.add(c.navbarImagePath);
      if (c.adminFaviconPath) usedPaths.add(c.adminFaviconPath);
      if (c.publicImagePath) usedPaths.add(c.publicImagePath);
      if (c.publicFaviconPath) usedPaths.add(c.publicFaviconPath);
    });

    let deletedCount = 0;

    for (const filename of filesInDisk) {
      const publicPath = `/uploads/${filename}`;
      if (!usedPaths.has(publicPath)) {
        this.deleteFile(publicPath);
        deletedCount++;
      }
    }

    return { deletedCount };
  }
}