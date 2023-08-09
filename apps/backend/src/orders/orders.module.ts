import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersMapper } from './orders.mapper';

@Module({
  imports: [ConfigModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersMapper],
})
export class OrdersModule {}
