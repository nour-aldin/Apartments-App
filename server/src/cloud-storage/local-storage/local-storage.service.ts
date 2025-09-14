import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ICloudStorageService } from '../cloud-storage.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LocalStorageService implements ICloudStorageService {
  private readonly BASE_DIRECTORY = process.cwd();

  async uploadFile(file: Buffer, filePath: string) {
    try {
      if (!file || file.length === 0) {
        throw new UnprocessableEntityException('File buffer is empty');
      }

      const fullPath = this.BASE_DIRECTORY + '/' + filePath;

      const dir = path.dirname(fullPath);
      await fs.mkdir(dir, { recursive: true });

      await fs.writeFile(fullPath, file);

      await fs.access(fullPath);

      return true;
    } catch (error: any) {
      console.error(`Failed to upload file to ${filePath}`);
      return false;
    }
  }

  async readFile(path: string) {
    const fullPath = this.BASE_DIRECTORY + path;
    await fs.access(fullPath);

    const fileBuffer = await fs.readFile(fullPath);

    if (fileBuffer) return { file: fileBuffer, path };

    throw new UnprocessableEntityException(
      `Failed to read file located at ${fullPath}`,
    );
  }

  async validatePath(path: string) {
    const fullPath = this.BASE_DIRECTORY + '/' + path;
    try {
      await fs.access(fullPath);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Cannot read file located at ${path}`,
      );
    }
  }
}
