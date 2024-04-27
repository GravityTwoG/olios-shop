import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';

import {
  InvalidPayloadException,
  UnknownException,
} from '../domain/domain.exception';
import { assertTruthy } from '../domain/assertions';

import { S3ClientService } from '../s3Client';
import { BucketName, buckets } from './buckets';
import { createPolicy } from './create-policy';

@Injectable()
export class ImagesService implements OnModuleInit {
  private readonly logger = new Logger(ImagesService.name);

  constructor(private readonly s3ClientService: S3ClientService) {}

  async onModuleInit() {
    try {
      await this.initializeBuckets();
    } catch (error) {
      this.logger.error(
        `Error while initializing buckets: ${JSON.stringify(error)}`,
      );
    }
  }

  private async initializeBuckets() {
    await Promise.all(
      buckets.map(async (bucketName) => {
        try {
          const bucket = await this.s3ClientService.getBucket(bucketName);
          const newPolicy = JSON.stringify(createPolicy(bucketName));

          if (bucket) {
            const existingPolicy = await this.s3ClientService.getBucketPolicy(
              bucketName,
            );
            if (!existingPolicy || existingPolicy !== newPolicy) {
              await this.s3ClientService.setBucketPolicy(bucketName, newPolicy);
            }
          } else {
            await this.s3ClientService.createBucket(bucketName);
            await this.s3ClientService.setBucketPolicy(bucketName, newPolicy);
          }
        } catch (error) {
          this.logger.error(
            `Error while initializing bucket ${bucketName}: ${JSON.stringify(
              error,
            )}`,
          );

          throw error;
        }
      }),
    );
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

      const fileName = `${hash}_${crypto.randomBytes(6).toString('hex')}_${
        file.originalname
      }`;

      await this.s3ClientService.putObject({
        bucketName,
        objectName: fileName,
        file,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000',
      });

      return {
        url: `${process.env.S3_ENDPOINT}/${bucketName}/${fileName}`,
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

  delete(objectName: string, bucketName: BucketName) {
    return this.s3ClientService.removeObject(bucketName, objectName);
  }
}
