import { Module } from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';

@Module({
  imports: [],
  providers: [ProductCategoriesController, ProductCategoriesService],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
