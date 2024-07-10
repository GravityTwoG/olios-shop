import { Injectable } from '@nestjs/common';

import { User, CustomerProfile, Prisma } from '@prisma/client';

import { CartsService } from 'src/carts/carts.service';
import { BaseListDTO } from 'src/common/dto/base-list.dto';

import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class CustomerProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartsService: CartsService,
  ) {}

  async createProfile(
    user: User,
    prisma: Prisma.TransactionClient,
  ): Promise<CustomerProfile> {
    const profile = await prisma.customerProfile.create({
      data: {
        userId: user.id,
      },
    });
    await this.cartsService.createDefaultCart(profile.id, prisma);

    return profile;
  }

  async find(id: string): Promise<CustomerProfile> {
    const profile = await this.prisma.customerProfile.findUniqueOrThrow({
      where: { id },
    });
    return profile;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerProfileWhereUniqueInput;
    where?: Prisma.CustomerProfileWhereInput;
  }): Promise<BaseListDTO<CustomerProfile>> {
    const list = await this.prisma.customerProfile.findMany(params);
    const count = await this.prisma.customerProfile.count({
      where: params.where,
    });

    return { count, list };
  }
}
