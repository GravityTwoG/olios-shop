import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketsService } from './baskets.service';
import { BasketsResolver } from './baskets.resolver';
import { BasketsRepository } from './baskets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BasketsRepository])],
  providers: [BasketsResolver, BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}
