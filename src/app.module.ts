import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './configuration.schema';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BasketsModule } from './baskets/baskets.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalExceptionFilter } from './global.exception-filter';
import { ImagesModule } from './lib/images';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    PrismaModule,
    ImagesModule,

    UsersModule,
    AuthModule,
    BasketsModule,
    ProductsModule,
    ProductCategoriesModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
