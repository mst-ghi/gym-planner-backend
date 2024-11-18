import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { STORAGE_CONFIGS } from './storage.constants';
import { StorageModuleConfigs } from './storage.module';

@Injectable()
export class StorageService {
  @Inject(STORAGE_CONFIGS)
  private readonly options: StorageModuleConfigs;

  private _property: string = 'file';

  // upload media/file
  async put(request: any, property?: string) {
    if (property) {
      this._property = property;
    }

    return new Promise((resolve, reject) => {
      try {
        this.getOptions()(request, null as any, (error: any) => {
          if (error) {
            return reject(`Failed [internal] to upload media/file: ${error}`);
          }

          Logger.verbose(request.user.fullname + ' uploaded file', 'StorageService');
          resolve({ ...request.files[0] });
        });
      } catch (error) {
        return reject(`Failed to upload media/file: ${error}`);
      }
    });
  }

  // delete media/file
  async delete(Key: string) {
    return new Promise((resolve, reject) => {
      this.client.send(new DeleteObjectCommand({ Bucket: this.options.bucketName, Key }), (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  private getOptions() {
    return multer({
      storage: multerS3({
        s3: this.client,
        acl: 'public-read',
        bucket: this.options.bucketName,
        key: (_: any, file: any, cb: any) => {
          if (!file) throw new Error('File not uploaded!');

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          const i = file.originalname.lastIndexOf('.');
          const ext = i < 0 ? '' : file.originalname.substr(i);

          cb(null, `${randomName}${ext}`);
        },
      }),

      limits: {
        fileSize: this.options.limitSize,
      },

      fileFilter: (_: any, file: any, callback: any) => {
        const mimes = this.options.mimes?.split(',') || [];

        let idx = file.originalname.lastIndexOf('.');
        const ext = idx < 0 ? '' : file.originalname.substr(++idx);

        if (!mimes.includes(ext)) {
          return callback(new Error('File not supported'), false);
        }

        return callback(null, true);
      },
    }).array(this._property || 'file', 1);
  }

  // S3 client for access to all apis
  get client(): S3Client {
    return new S3Client({
      endpoint: this.options.endPoint,
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKey,
        secretAccessKey: this.options.secretKey,
      },
    });
  }

  public setRequestProperty(property: string) {
    this._property = property;
    return this;
  }
}
