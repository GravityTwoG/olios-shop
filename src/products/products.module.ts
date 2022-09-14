import { Module } from '@nestjs/common';

import { ProductCategoriesModule } from '../product-categories/product-categories.module';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductCategoriesModule],
  providers: [ProductsController, ProductsService],
})
export class ProductsModule {}
