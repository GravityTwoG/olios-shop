import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as Minio from 'minio';

export type MinioClient = Minio.Client;
export type NestMinioOptions = Minio.ClientOptions;

export interface NestMinioOptionsFactory {
  createNestMinioOptions(): Promise<NestMinioOptions> | NestMinioOptions;
}

export interface NestMinioAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestMinioOptionsFactory>;
  useClass?: Type<NestMinioOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NestMinioOptions> | NestMinioOptions;
}
