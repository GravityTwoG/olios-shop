import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImagesModule } from 'src/lib/images';

import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoryMapper } from './product-category.mapper';

@Module({
  imports: [ConfigModule, ImagesModule],
  providers: [ProductCategoriesService, ProductCategoryMapper],
  controllers: [ProductCategoriesController],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
