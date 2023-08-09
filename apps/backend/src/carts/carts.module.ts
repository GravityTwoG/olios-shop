import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartsMapper } from './carts.mapper';

@Module({
  imports: [ConfigModule],
  providers: [CartsService, CartsMapper],
  controllers: [CartsController],
  exports: [CartsService],
})
export class CartsModule {}
