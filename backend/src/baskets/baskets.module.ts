import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';
import { CartMapper } from './cart.mapper';

@Module({
  imports: [ConfigModule],
  providers: [BasketsService, CartMapper],
  controllers: [BasketsController],
  exports: [BasketsService],
})
export class BasketsModule {}
