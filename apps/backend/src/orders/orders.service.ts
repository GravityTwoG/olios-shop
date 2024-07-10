import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { assertTruthy } from 'src/lib/domain/assertions';
import {
  InvalidPayloadException,
  NoPermissionException,
} from 'src/lib/domain/domain.exception';

import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderStatus, Prisma } from '@prisma/client';

import { OrdersMapper } from './orders.mapper';

const OrderInclude = {
  orderItems: {
    include: {
      product: {
        include: { productImages: { take: 1 } },
      },
    },
  },
};

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: OrdersMapper,
  ) {}

  async create(createOrderDto: CreateOrderDTO, userId: string) {
    return this.prisma.$transaction(
      async (tx) => {
        const profile = await this.getCustomerProfile(userId, tx);

        const cart = await tx.cart.findUniqueOrThrow({
          where: { id: createOrderDto.cartId },
          include: {
            cartItems: {
              include: {
                product: true,
              },
            },
          },
        });

        assertTruthy(
          cart.customerProfileId === profile.id,
          NoPermissionException,
          'Invalid customer',
        );

        const cartItems = cart.cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          productId: item.productId,
          productName: item.product.name,
          price: item.product.realPrice,
        }));

        assertTruthy(
          cartItems.length > 0,
          InvalidPayloadException,
          'Cart is empty',
        );

        const order = await tx.order.create({
          data: {
            customerProfileId: profile.id,
            status: OrderStatus.CREATED,

            country: createOrderDto.country,
            city: createOrderDto.city,
            street: createOrderDto.street,
            house: createOrderDto.house,
            flat: createOrderDto.flat,
            floor: createOrderDto.floor,

            name: createOrderDto.name,
            phone: createOrderDto.phoneNumber,

            orderItems: {
              createMany: {
                data: cartItems.map((cartItem) => ({
                  quantity: cartItem.quantity,
                  productId: cartItem.productId,
                  name: cartItem.productName,
                  price: cartItem.price,
                })),
              },
            },
          },
          include: OrderInclude,
        });

        await this.prisma.cartItem.deleteMany({
          where: { id: { in: cart.cartItems.map((item) => item.id) } },
        });

        return this.mapper.mapToOrderDTO(order);
      },
      { isolationLevel: 'Serializable' },
    );
  }

  private getCustomerProfile(
    userId: string,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    return prisma.customerProfile.findFirstOrThrow({ where: { userId } });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
  }) {
    const list = await this.prisma.order.findMany({
      ...params,
      include: OrderInclude,
    });
    const count = await this.prisma.order.count({ where: params.where });

    return { list: list.map(this.mapper.mapToOrderDTO), count };
  }

  async getCustomersOrders(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.OrderWhereUniqueInput;
      where?: Prisma.OrderWhereInput;
    },
    userId: string,
  ) {
    const profile = await this.getCustomerProfile(userId);

    return this.findAll({
      ...params,
      where: { ...params.where, customerProfileId: profile.id },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirstOrThrow({
      where: { id },
      include: OrderInclude,
    });

    return this.mapper.mapToOrderDTO(order);
  }

  async getCustomersOrder(id: string, userId: string) {
    const profile = await this.getCustomerProfile(userId);

    const order = await this.prisma.order.findFirstOrThrow({
      where: { id, customerProfileId: profile.id },
      include: OrderInclude,
    });

    return this.mapper.mapToOrderDTO(order);
  }

  paid(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await this.getCustomerProfile(userId);
      const order = await tx.order.findFirstOrThrow({
        where: { id, customerProfileId: profile.id },
      });

      assertTruthy(
        order.status !== OrderStatus.CANCELED &&
          order.status !== OrderStatus.DELIVERED &&
          order.status !== OrderStatus.PAID,
        InvalidPayloadException,
        'This order cannot be paid',
      );

      const updatedOrder = await tx.order.update({
        data: { status: OrderStatus.PAID },
        where: { id },
        include: OrderInclude,
      });
      return this.mapper.mapToOrderDTO(updatedOrder);
    });
  }

  delivered(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirstOrThrow({
        where: { id },
      });

      assertTruthy(
        order.status === OrderStatus.PAID,
        InvalidPayloadException,
        'This order cannot be delivered',
      );

      const updatedOrder = await tx.order.update({
        data: { status: OrderStatus.DELIVERED },
        where: { id },
        include: OrderInclude,
      });
      return this.mapper.mapToOrderDTO(updatedOrder);
    });
  }

  cancel(id: string, userId: string) {
    return this.prisma.$transaction(
      async (tx) => {
        const profile = await this.getCustomerProfile(userId, tx);
        const order = await tx.order.findFirstOrThrow({
          where: { id, customerProfileId: profile.id },
        });

        assertTruthy(
          order.status !== OrderStatus.PAID &&
            order.status !== OrderStatus.DELIVERED,
          InvalidPayloadException,
          'This order cannot be cancelled',
        );

        const updatedOrder = await tx.order.update({
          data: { status: OrderStatus.CANCELED },
          where: { id },
          include: OrderInclude,
        });
        return this.mapper.mapToOrderDTO(updatedOrder);
      },
      { isolationLevel: 'Serializable' },
    );
  }
}
