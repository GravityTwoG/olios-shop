import { Injectable } from '@nestjs/common';

import { Basket, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketsService {
  constructor(private readonly prisma: PrismaService) {}

  createBasket(customerProfileId: string): Promise<Basket> {
    return this.createBasketInTransaction(customerProfileId, this.prisma);
  }

  createBasketInTransaction(
    customerProfileId: string,
    prisma: Prisma.TransactionClient,
  ): Promise<Basket> {
    return prisma.basket.create({
      data: { customerProfileId },
    });
  }

  findAll(): Promise<Basket[]> {
    return this.prisma.basket.findMany({});
  }

  async findOne(id: string): Promise<Basket> {
    const basket = await this.prisma.basket.findUniqueOrThrow({
      where: { id },
    });
    return basket;
  }

  // async update(
  //   id: string,
  //   updateBasketInput: UpdateBasketInput,
  // ): Promise<Basket> {
  //   const {} = updateBasketInput;
  //   return this.basketsRepository.update({ id }, {});
  // }
}
