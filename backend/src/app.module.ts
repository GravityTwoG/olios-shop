import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './configuration.schema';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { ContentManagerProfilesModule } from './profiles/content-managers/content-manager-profiles.module';
import { CustomerProfilesModule } from './profiles/customers/customer-profiles.module';

import { BasketsModule } from './baskets/baskets.module';

import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './products/product-categories/product-categories.module';

import { PrismaModule } from './lib/prisma/prisma.module';
import { ImagesModule } from './lib/images';

import { GlobalExceptionFilter } from './global.exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    PrismaModule,
    ImagesModule,

    AuthModule,
    UsersModule,
    CustomerProfilesModule,
    ContentManagerProfilesModule,
    BasketsModule,
    ProductsModule,
    ProductCategoriesModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
