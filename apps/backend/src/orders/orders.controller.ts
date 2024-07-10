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
import { OrderResponseDTO, OrdersListResponseDTO } from './dto/order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.CUSTOMER)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDTO,
    @CurrentUser() user: RequestUser,
  ): Promise<OrderResponseDTO> {
    const order = await this.ordersService.create(createOrderDto, user.id);
    return { data: order };
  }

  @Roles(UserRole.MANAGER)
  @Get('/manager')
  async allOrders(
    @Query() query: GetOrdersDTO,
  ): Promise<OrdersListResponseDTO> {
    const result = await this.ordersService.findAll(query);

    return {
      data: result,
    };
  }

  @Roles(UserRole.MANAGER)
  @Get('/manager/:id')
  async getOrder(@Param('id') id: string): Promise<OrderResponseDTO> {
    const order = await this.ordersService.findOne(id);
    return { data: order };
  }

  @Roles(UserRole.CUSTOMER)
  @Patch('/manager/:id/delivered')
  async markAsDelivered(@Param('id') id: string): Promise<OrderResponseDTO> {
    const order = await this.ordersService.delivered(id);
    return { data: order };
  }

  @Roles(UserRole.CUSTOMER)
  @Get()
  async customersOrders(
    @Query() query: GetOrdersDTO,
    @CurrentUser() user: RequestUser,
  ): Promise<OrdersListResponseDTO> {
    const result = await this.ordersService.getCustomersOrders(query, user.id);

    return {
      data: result,
    };
  }

  @Roles(UserRole.CUSTOMER)
  @Get(':id')
  async getCustomerOrder(
    @Param('id') id: string,
    @CurrentUser() user: RequestUser,
  ): Promise<OrderResponseDTO> {
    const order = await this.ordersService.getCustomersOrder(id, user.id);
    return { data: order };
  }

  @Roles(UserRole.CUSTOMER)
  @Patch(':id')
  async cancel(
    @Param('id') id: string,
    @CurrentUser() user: RequestUser,
  ): Promise<OrderResponseDTO> {
    const order = await this.ordersService.cancel(id, user.id);
    return { data: order };
  }
}
