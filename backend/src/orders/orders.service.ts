import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { assertTruthy } from 'src/lib/domain/assertions';
import { InvalidPayloadException } from 'src/lib/domain/domain.exception';

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

        const cart = await tx.basket.findUniqueOrThrow({
          where: { id: createOrderDto.basketId, customerProfileId: profile.id },
          include: {
            basketItems: {
              include: {
                product: true,
              },
            },
          },
        });

        const cartItems = cart.basketItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          productId: item.productId,
          productName: item.product.name,
          price: item.product.realPrice,
        }));

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

            name: '',
            phone: '',

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

        await this.prisma.basketItem.deleteMany({
          where: { id: { in: cart.basketItems.map((item) => item.id) } },
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

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.OrderWhereUniqueInput;
      where?: Prisma.OrderWhereInput;
      orderBy?: Prisma.Enumerable<Prisma.OrderOrderByWithRelationAndSearchRelevanceInput>;
    },
    userId: string,
  ) {
    const profile = await this.getCustomerProfile(userId);

    const list = await this.prisma.order.findMany({
      ...params,
      where: { customerProfileId: profile.id },
      include: OrderInclude,
    });
    const count = await this.prisma.order.count({ where: params.where });

    return { list: list.map(this.mapper.mapToOrderDTO), count };
  }

  async findOne(id: string, userId: string) {
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

      return tx.order.update({
        data: { status: OrderStatus.PAID },
        where: { id },
        include: OrderInclude,
      });
    });
  }

  delivered(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await this.getCustomerProfile(userId);
      const order = await tx.order.findFirstOrThrow({
        where: { id, customerProfileId: profile.id },
      });

      assertTruthy(
        order.status === OrderStatus.PAID,
        InvalidPayloadException,
        'This order cannot be delivered',
      );

      return tx.order.update({
        data: { status: OrderStatus.DELIVERED },
        where: { id },
        include: OrderInclude,
      });
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

        return tx.order.update({
          data: { status: OrderStatus.CANCELED },
          where: { id },
          include: OrderInclude,
        });
      },
      { isolationLevel: 'Serializable' },
    );
  }
}
