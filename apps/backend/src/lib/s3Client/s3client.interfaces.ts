import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

export type { S3Client };

export type NestS3ClientOptions = S3ClientConfig;

export interface NestS3ClientOptionsFactory {
  createNestS3ClientOptions():
    | Promise<NestS3ClientOptions>
    | NestS3ClientOptions;
}

export interface NestS3ClientAsyncOptions<I extends unknown[]>
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: I;
  useExisting?: Type<NestS3ClientOptionsFactory>;
  useClass?: Type<NestS3ClientOptionsFactory>;
  useFactory?: (
    ...args: I
  ) => Promise<NestS3ClientOptions> | NestS3ClientOptions;
}
