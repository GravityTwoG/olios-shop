import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RequestUser } from 'src/auth/types';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { GetOrdersDTO } from './dto/get-orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.CUSTOMER)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDTO,
    @CurrentUser() user: RequestUser,
  ) {
    return this.ordersService.create(createOrderDto, user.id);
  }

  @Roles(UserRole.CUSTOMER)
  @Get()
  findAll(@Query() query: GetOrdersDTO, @CurrentUser() user: RequestUser) {
    return this.ordersService.findAll(
      { take: query.take, skip: query.skip },
      user.id,
    );
  }

  @Roles(UserRole.CUSTOMER)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.ordersService.findOne(id, user.id);
  }

  @Roles(UserRole.CUSTOMER)
  @Patch(':id')
  cancel(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.ordersService.cancel(id, user.id);
  }
}
