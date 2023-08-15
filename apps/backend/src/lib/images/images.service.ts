import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';

import {
  InvalidPayloadException,
  UnknownException,
} from '../domain/domain.exception';
import { assertTruthy } from '../domain/assertions';

import { InjectMinio, MinioClient } from '../minio';
import { BucketName, buckets } from './buckets';
import { createPolicy } from './create-policy';

@Injectable()
export class ImagesService implements OnModuleInit {
  private readonly logger = new Logger(ImagesService.name);

  constructor(@InjectMinio() private readonly minioClient: MinioClient) {}

  async onModuleInit() {
    try {
      await this.initializeBuckets();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async initializeBuckets() {
    for (const bucketName of buckets) {
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
    }
  }

  async upload(file: Express.Multer.File, bucketName: BucketName) {
    try {
      assertTruthy(
        file.mimetype.match(/image\/*/),
        InvalidPayloadException,
        `This image type is not supported: ${file.mimetype}`,
      );

      const timestamp = Date.now().toString();
      const hash = crypto.createHash('md5').update(timestamp).digest('hex');

      const metaData = {
        'Content-Type': file.mimetype,
        'Cache-Control': 'public, max-age=31536000',
      };

      const fileName = `${hash}_${crypto.randomBytes(6).toString('hex')}_${
        file.originalname
      }`;

      await this.minioClient.putObject(
        bucketName,
        fileName,
        file.buffer,
        file.size,
        metaData,
      );

      return {
        url: `${process.env.MINIO_PROTOCOL}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`,
        path: `${bucketName}/${fileName}`,
        objectName: `${fileName}`,
      };
    } catch (err) {
      throw new UnknownException(
        `Error while saving file: ${JSON.stringify(err)}`,
      );
    }
  }

  async uploadMany(images: Express.Multer.File[], bucketName: BucketName) {
    const r: { url: string; path: string; objectName: string }[] = [];

    const result = await Promise.allSettled(
      images.map((image) => this.upload(image, bucketName)),
    );
    result.forEach((res) => {
      if (res.status === 'fulfilled') {
        r.push(res.value);
      }
    });

    return r;
  }

  async delete(objectName: string, bucketName: BucketName) {
    return this.minioClient.removeObject(bucketName, objectName);
  }
}
