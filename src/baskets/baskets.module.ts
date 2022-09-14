import { Module } from '@nestjs/common';

import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';

@Module({
  imports: [],
  providers: [BasketsService],
  controllers: [BasketsController],
  exports: [BasketsService],
})
export class BasketsModule {}
