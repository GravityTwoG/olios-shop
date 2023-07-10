import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImagesModule } from 'src/lib/images';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductMapper } from './product.mapper';

@Module({
  imports: [ConfigModule, ImagesModule],
  providers: [ProductsService, ProductMapper],
  controllers: [ProductsController],
})
export class ProductsModule {}
