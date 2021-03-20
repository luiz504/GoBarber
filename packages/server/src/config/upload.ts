import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadsFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads');
interface IUploadConfig {
  driver: 'local' | 's3';
  tempFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    s3: {
      bucket: string;
      region: string;
      bucketURL: string;
    };
  };
}
const uploadConfig = {
  driver: process.env.STORAGE_DRIVER || 'local',
  tempFolder,
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'temp'),
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    s3: {
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_DEFAULT_REGION,
      bucketURL: process.env.AWS_BUCKET_URL,
    },
  },
} as IUploadConfig;

export default uploadConfig;
