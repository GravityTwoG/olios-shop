import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesResolver } from './product-categories.resolver';
import { ProductCategoriesRepository } from './product-categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoriesRepository])],
  providers: [ProductCategoriesResolver, ProductCategoriesService],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
