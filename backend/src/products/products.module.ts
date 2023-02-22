import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ImagesModule } from 'src/lib/images';

@Module({
  imports: [ImagesModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
