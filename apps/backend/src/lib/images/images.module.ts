import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';
import { S3ClientModule } from '../s3Client';

import { ImagesService } from './images.service';

@Module({
  imports: [
    S3ClientModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService as unknown as AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          endpoint: configService.get('S3_ENDPOINT', {
            infer: true,
          }),
          forcePathStyle: true, // url formed as https://customendpoint.com/bucketname when true
          credentials: {
            accessKeyId: configService.get('S3_ACCESS_KEY_ID', {
              infer: true,
            }),
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY', {
              infer: true,
            }),
          },
          region: 'global',
        };
      },
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
