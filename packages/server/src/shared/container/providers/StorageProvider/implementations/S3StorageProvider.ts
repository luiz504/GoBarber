import uploadConfig from '@config/upload';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: uploadConfig.config.s3.region,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);
    const contentType = mime.getType(originalPath);

    const { bucket } = uploadConfig.config.s3;

    if (!contentType) {
      throw new Error('File Not Found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const { bucket } = uploadConfig.config.s3;

    await this.client
      .deleteObject({
        Bucket: bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
