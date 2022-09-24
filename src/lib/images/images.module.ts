import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MinioModule } from '../minio';

import { ImagesService } from './images.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get<string>('MINIO_ENDPOINT')!,
          port: configService.get<number>('MINIO_PORT')!,
          useSSL: false,
          accessKey: configService.get<string>('MINIO_ACCESS_KEY')!,
          secretKey: configService.get<string>('MINIO_SECRET_KEY')!,
        };
      },
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
