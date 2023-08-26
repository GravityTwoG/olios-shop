import { Injectable, Inject } from '@nestjs/common';
import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3ServiceException,
  HeadBucketCommandOutput,
  GetBucketPolicyCommand,
} from '@aws-sdk/client-s3';

import { NEST_S3_CLIENT_OPTIONS } from './s3client.constants';
import { NestS3ClientOptions } from './s3client.interfaces';

interface INestS3ClientService {
  getClient(): S3Client;
}

@Injectable()
export class S3ClientService implements INestS3ClientService {
  private s3Client: S3Client;

  constructor(
    @Inject(NEST_S3_CLIENT_OPTIONS)
    private _NestS3ClientOptions: NestS3ClientOptions,
  ) {}

  getClient(): S3Client {
    if (!this.s3Client) {
      this.s3Client = new S3Client(this._NestS3ClientOptions);
    }

    return this.s3Client;
  }

  createBucket(bucketName: string) {
    return this.getClient().send(
      new CreateBucketCommand({
        Bucket: bucketName,
        ACL: 'public-read',
      }),
    );
  }

  setBucketPolicy(bucketName: string, policy: string) {
    return this.getClient().send(
      new PutBucketPolicyCommand({ Bucket: bucketName, Policy: policy }),
    );
  }

  async getBucket(bucketName: string): Promise<HeadBucketCommandOutput | null> {
    try {
      const bucket = await this.getClient().send(
        new HeadBucketCommand({ Bucket: bucketName }),
      );
      return bucket;
    } catch (error) {
      // https://docs.tebi.io/s3/HeadBucket.html tebi returns 403 error if bucket does not exist
      if (
        error instanceof S3ServiceException &&
        (error.$metadata.httpStatusCode === 403 ||
          error.$metadata.httpStatusCode === 404)
      ) {
        return null;
      }
      throw error;
    }
  }

  async getBucketPolicy(bucketName: string) {
    const output = await this.getClient().send(
      new GetBucketPolicyCommand({ Bucket: bucketName }),
    );

    return output.Policy ? output.Policy : null;
  }

  putObject(data: {
    bucketName: string;
    objectName: string;
    file: Express.Multer.File;
    ContentType: string;
    CacheControl: string;
  }) {
    return this.getClient().send(
      new PutObjectCommand({
        Bucket: data.bucketName,
        Key: data.objectName,
        Body: data.file.buffer,
        ContentType: data.ContentType,
        CacheControl: data.CacheControl,
        ACL: 'public-read',
      }),
    );
  }

  removeObject(bucketName: string, objectName: string) {
    return this.getClient().send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: objectName }),
    );
  }
}
