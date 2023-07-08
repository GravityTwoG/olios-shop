import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';
import { MinioModule } from '../minio';

import { ImagesService } from './images.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          endPoint: configService.get('MINIO_ENDPOINT', {
            infer: true,
          }),
          port: configService.get('MINIO_PORT')!,
          useSSL: false,
          accessKey: configService.get('MINIO_ACCESS_KEY', {
            infer: true,
          }),
          secretKey: configService.get('MINIO_SECRET_KEY', {
            infer: true,
          }),
        };
      },
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
