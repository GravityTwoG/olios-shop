import { Injectable, Inject } from '@nestjs/common';
import * as Minio from 'minio';

import { NEST_MINIO_OPTIONS } from './minio.constants';
import { NestMinioOptions } from './minio.interfaces';

interface INestMinioService {
  getMinio(): Minio.Client;
}

@Injectable()
export class MinioService implements INestMinioService {
  private _minioConnection: Minio.Client;

  constructor(
    @Inject(NEST_MINIO_OPTIONS) private _NestMinioOptions: NestMinioOptions,
  ) {}

  getMinio(): Minio.Client {
    if (!this._minioConnection) {
      this._minioConnection = new Minio.Client(this._NestMinioOptions);
    }
    return this._minioConnection;
  }
}
