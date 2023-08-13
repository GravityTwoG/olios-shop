import { Injectable } from '@nestjs/common';

import { Cart, Prisma } from '@prisma/client';

import { NoPermissionException } from 'src/lib/domain/domain.exception';
import { assertTruthy } from 'src/lib/domain/assertions';
import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CartsMapper } from './carts.mapper';
import { CartItemDTO } from './dto/cart.dto';
import { CreateCartDTO } from './dto/create-cart.dto';
import { ItemToConvertDTO } from './dto/items-to-convert.dto';

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
  cartItems: { include: CartItemInclude },
};

@Injectable()
export class CartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CartsMapper,
  ) {}

  // Carts
  createDefaultCart(
    customerProfileId: string,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Cart> {
    return prisma.cart.create({
      data: {
        customerProfileId: customerProfileId,
        name: 'Default',
        isDefault: true,
      },
    });
  }

  async createCart(
    userId: string,
    dto: CreateCartDTO,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    const cart = await prisma.cart.create({
      data: {
        customerProfileId: profile.id,
        name: dto.name,
        isDefault: false,
      },
      include: CartInclude,
    });

    return this.mapper.mapToCartDTO(cart);
  }

  async findCustomersCarts(userId: string) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    const carts = await this.prisma.cart.findMany({
      where: { customerProfileId: profile.id },
      select: {
        id: true,
        name: true,
        isDefault: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      list: carts,
      count: carts.length,
    };
  }

  async findCustomersCartById(dto: { userId: string; cartId: string }) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: dto.userId },
    });

    const cart = await this.prisma.cart.findUniqueOrThrow({
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

  async selectAsDefault(userId: string, cartId: string) {
    return this.prisma.$transaction(
      async (tx) => {
        const profile = await tx.customerProfile.findUniqueOrThrow({
          where: { userId: userId },
        });

        await tx.cart.updateMany({
          where: {
            customerProfileId: profile.id,
          },
          data: {
            isDefault: false,
          },
        });

        const cart = await tx.cart.update({
          where: { id: cartId },
          data: { isDefault: true },
          include: CartInclude,
        });

        return this.mapper.mapToCartDTO(cart);
      },
      { isolationLevel: 'Serializable' },
    );
  }

  async deleteCart(userId: string, cartId: string): Promise<void> {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    await this.prisma.cart.deleteMany({
      where: {
        id: cartId,
        customerProfileId: profile.id,
        isDefault: false,
      },
    });
  }

  async convertToCartFromIds(items: ItemToConvertDTO[]) {
    const products = await this.prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) } },
      select: {
        id: true,
        name: true,
        oldPrice: true,
        realPrice: true,
        productImages: true,
      },
    });

    const itemProductIdMap: { [key: number]: ItemToConvertDTO } = {};
    items.forEach((item) => {
      itemProductIdMap[item.productId] = item;
    });

    const data = {
      id: '',
      name: '',
      isDefault: true,
      cartItems: products.map((product) => ({
        id: itemProductIdMap[product.id].id,
        productId: product.id,
        quantity: itemProductIdMap[product.id].quantity,
        product,
      })),
    };

    return this.mapper.mapToCartDTO(data);
  }

  async convertToCartItemFromId({ productId, quantity, id }: ItemToConvertDTO) {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        oldPrice: true,
        realPrice: true,
        productImages: true,
      },
    });

    const data = {
      id,
      productId,
      quantity,
      product,
    };

    return this.mapper.mapToCartItemDTO(data);
  }

  // Cart items
  async addToCart(data: {
    userId: string;
    productId: number;
    quantity: number;
  }): Promise<CartItemDTO> {
    const cart = await this.getCustomersDefaultCart(data.userId);

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { productId: data.productId, cartId: cart.id },
    });

    if (existingItem) {
      const updatedItem = await this.prisma.cartItem.update({
        data: {
          quantity: data.quantity,
        },
        where: { id: existingItem.id },
        include: CartItemInclude,
      });
      return this.mapper.mapToCartItemDTO(updatedItem);
    }

    const newItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        quantity: data.quantity,
        productId: data.productId,
      },
      include: CartItemInclude,
    });

    return this.mapper.mapToCartItemDTO(newItem);
  }

  private async getCustomersDefaultCart(userId: string) {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { userId: userId },
    });

    const cart = await this.prisma.cart.findFirstOrThrow({
      where: { customerProfileId: profile.id, isDefault: true },
    });
    return cart;
  }

  async isInCart(data: {
    userId: string;
    productId: number;
  }): Promise<CartItemDTO> {
    const cart = await this.getCustomersDefaultCart(data.userId);

    const item = await this.prisma.cartItem.findFirst({
      where: { productId: data.productId, cartId: cart.id },
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

  async removeFromCart(data: {
    userId: string;
    cartItemId: string;
  }): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id: data.cartItemId },
    });
  }
}
