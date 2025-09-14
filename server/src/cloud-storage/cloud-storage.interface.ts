export interface ICloudStorageService {
  uploadFile(file: Buffer, filePath: string): Promise<boolean>;
  readFile(path: string): Promise<{ file: Buffer; path: string }>;
  validatePath(path: string): Promise<void>;
}
