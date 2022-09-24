import { Module } from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ImagesModule } from 'src/lib/images';

@Module({
  imports: [ImagesModule],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
