import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, DatabaseConfig } from './configuration';
import { configValidationSchema } from './configuration.schema';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BasketsModule } from './baskets/baskets.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`,
      load: [configuration],
      cache: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          autoLoadModels: true,
          synchronize: true,
          entities: [join(__dirname, '**', '*.entity.{js,ts}')],
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      uploads: false,
    }),
    UsersModule,
    AuthModule,
    BasketsModule,
    ProductsModule,
    ProductCategoriesModule,
  ],
})
export class AppModule {}
