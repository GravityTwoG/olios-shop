import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoriesModule } from '../product-categories/product-categories.module';

import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    ProductCategoriesModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
