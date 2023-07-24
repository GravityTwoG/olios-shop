import { Injectable } from '@nestjs/common';

import { Basket, Prisma } from '@prisma/client';

import { NoPermissionException } from 'src/lib/domain/domain.exception';
import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CartMapper } from './cart.mapper';
import { CartItemDTO } from './dto/cart.dto';
import { assertTruthy } from 'src/lib/domain/assertions';

const CartItemInclude = {
  product: {
    select: {
      id: true,
      name: true,
      oldPrice: true,
      realPrice: true,
      productImages: true,
    },
  },
};

const CartInclude = {
  basketItems: { include: CartItemInclude },
};

@Injectable()
export class BasketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CartMapper,
  ) {}

  createBasket(
    customerProfileId: string,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Basket> {
    return prisma.basket.create({
      data: { customerProfileId },
    });
  }

  findAll(): Promise<Basket[]> {
    return this.prisma.basket.findMany({});
  }

  async findCustomersCart(userId: string) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    const cart = await this.prisma.basket.findUniqueOrThrow({
      where: { customerProfileId: profile.id },
      include: CartInclude,
    });

    return this.mapper.mapToCartDTO(cart);
  }

  async findCustomersCartById(dto: { userId: string; cartId: string }) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: dto.userId },
    });

    const cart = await this.prisma.basket.findUniqueOrThrow({
      where: { id: dto.cartId },
      include: CartInclude,
    });

    assertTruthy(
      cart.customerProfileId === profile.id,
      NoPermissionException,
      'Invalid customer',
    );

    return this.mapper.mapToCartDTO(cart);
  }

  async isInCart(data: {
    userId: string;
    productId: number;
  }): Promise<CartItemDTO> {
    const cart = await this.getCustomersCart(data.userId);

    const item = await this.prisma.basketItem.findFirst({
      where: { productId: data.productId, basketId: cart.id },
      include: CartItemInclude,
    });

    return item
      ? this.mapper.mapToCartItemDTO(item)
      : {
          id: '',
          quantity: 0,
          productId: data.productId,
          productName: '',
          oldPrice: 0,
          realPrice: 0,
          sum: 0,
          thumbUrl: '',
        };
  }

  private async getCustomersCart(userId: string) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    const cart = await this.prisma.basket.findUniqueOrThrow({
      where: { customerProfileId: profile.id },
    });
    return cart;
  }

  async addToCart(data: {
    userId: string;
    productId: number;
    quantity: number;
  }): Promise<CartItemDTO> {
    const cart = await this.getCustomersCart(data.userId);

    const existingItem = await this.prisma.basketItem.findFirst({
      where: { productId: data.productId, basketId: cart.id },
    });

    if (existingItem) {
      const updatedItem = await this.prisma.basketItem.update({
        data: {
          quantity: data.quantity,
        },
        where: { id: existingItem.id },
        include: CartItemInclude,
      });
      return this.mapper.mapToCartItemDTO(updatedItem);
    }

    const newItem = await this.prisma.basketItem.create({
      data: {
        basketId: cart.id,
        quantity: data.quantity,
        productId: data.productId,
      },
      include: CartItemInclude,
    });

    return this.mapper.mapToCartItemDTO(newItem);
  }

  async removeFromCart(data: {
    userId: string;
    cartItemId: string;
  }): Promise<CartItemDTO> {
    await this.prisma.basketItem.delete({
      where: { id: data.cartItemId },
    });

    return {
      id: '',
      quantity: 0,
      productId: 0,
      productName: '',
      oldPrice: 0,
      realPrice: 0,
      sum: 0,
      thumbUrl: '',
    };
  }
}
