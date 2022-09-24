import { DynamicModule, Module, Provider } from '@nestjs/common';
import { connectionFactory } from './minio-connection.provider';

import { NEST_MINIO_OPTIONS } from './minio.constants';
import {
  NestMinioAsyncOptions,
  NestMinioOptions,
  NestMinioOptionsFactory,
} from './minio.interfaces';
import { MinioService } from './minio.service';

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class MinioModule {
  public static register(
    options: NestMinioOptions & { global?: boolean },
  ): DynamicModule {
    return {
      global: options.global,
      module: MinioModule,
      providers: [
        {
          provide: NEST_MINIO_OPTIONS,
          useValue: options,
        },
        MinioService,
      ],
      exports: [MinioModule, MinioService],
    };
  }

  public static registerAsync(options: NestMinioAsyncOptions): DynamicModule {
    const allImports = [...new Set([].concat(options.imports))];

    return {
      module: MinioModule,
      imports: allImports || [],
      providers: [this.createConnectAsyncProviders(options), MinioService],
      exports: [MinioModule],
    };
  }

  private static createConnectAsyncProviders(
    options: NestMinioAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_MINIO_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass and useExisting...
    return {
      provide: NEST_MINIO_OPTIONS,
      useFactory: async (optionsFactory: NestMinioOptionsFactory) =>
        optionsFactory.createNestMinioOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
