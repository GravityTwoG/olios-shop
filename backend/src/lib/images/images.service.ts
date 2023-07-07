import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';

import {
  InvalidPayloadException,
  UnknownException,
} from '../domain/domain.exception';
import { assertFalsy, assertTruthy } from '../domain/assertions';

import { InjectMinio, MinioClient } from '../minio';
import { BucketName, buckets } from './buckets';
import { createPolicy } from './create-policy';

@Injectable()
export class ImagesService implements OnModuleInit {
  private readonly logger = new Logger(ImagesService.name);

  constructor(@InjectMinio() private readonly minioClient: MinioClient) {}

  async onModuleInit() {
    await this.initializeBuckets();
  }

  public async initializeBuckets() {
    buckets.forEach(async (bucketName) => {
      const bucketExists = await this.minioClient.bucketExists(bucketName);

      if (!bucketExists) {
        await this.minioClient.makeBucket(bucketName, 'eu-west-1');
      }

      this.minioClient.setBucketPolicy(
        bucketName,
        JSON.stringify(createPolicy(bucketName)),
        (err) => {
          if (err) throw err;

          this.logger.log('Bucket policy was set.');
        },
      );
    });
  }

  public async upload(file: Express.Multer.File, bucketName: BucketName) {
    assertTruthy(
      file.mimetype.includes('jpeg') || file.mimetype.includes('png'),
      InvalidPayloadException,
      `This image type is not supported: ${file.mimetype}`,
    );

    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'Cache-Control': 'public, max-age=31536000',
    };

    // We need to append the extension at the end otherwise Minio will save it as a generic file
    const fileName = hashedFileName + extension;

    this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size,
      metaData,
      function (err) {
        assertFalsy(
          err,
          UnknownException,
          `Error while saving file: ${JSON.stringify(err)}`,
        );
      },
    );

    return {
      url: `${process.env.MINIO_PROTOCOL}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`,
      path: `${bucketName}/${fileName}`,
      objectName: `${fileName}`,
    };
  }

  async delete(objectName: string, bucketName: BucketName) {
    return this.minioClient.removeObject(bucketName, objectName);
  }
}
