import {
  DynamicModule,
  InjectionToken,
  Module,
  Provider,
} from '@nestjs/common';
import { connectionFactory } from './s3client.provider';

import { NEST_S3_CLIENT_OPTIONS } from './s3client.constants';
import {
  NestS3ClientAsyncOptions,
  NestS3ClientOptions,
  NestS3ClientOptionsFactory,
} from './s3client.interfaces';
import { S3ClientService } from './s3client.service';

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory, S3ClientService],
})
export class S3ClientModule {
  public static register(
    options: NestS3ClientOptions & { global?: boolean },
  ): DynamicModule {
    return {
      global: options.global,
      module: S3ClientModule,
      providers: [
        {
          provide: NEST_S3_CLIENT_OPTIONS,
          useValue: options,
        },
        S3ClientService,
      ],
      exports: [S3ClientModule, S3ClientService],
    };
  }

  public static registerAsync<I extends unknown[]>(
    options: NestS3ClientAsyncOptions<I>,
  ): DynamicModule {
    const allImports: typeof options.imports = [];
    if (options.imports) {
      allImports.push(...new Set(options.imports));
    }

    return {
      module: S3ClientModule,
      imports: allImports ?? [],
      providers: [this.createConnectAsyncProviders(options), S3ClientService],
      exports: [S3ClientModule],
    };
  }

  private static createConnectAsyncProviders<I extends unknown[]>(
    options: NestS3ClientAsyncOptions<I>,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_S3_CLIENT_OPTIONS,
        useFactory: options.useFactory,
        inject: (options.inject ?? []) as unknown as InjectionToken[],
      };
    }

    // For useClass and useExisting...
    return {
      provide: NEST_S3_CLIENT_OPTIONS,
      useFactory: async (optionsFactory: NestS3ClientOptionsFactory) =>
        optionsFactory.createNestS3ClientOptions(),
      inject: [options.useExisting || options.useClass!],
    };
  }
}
