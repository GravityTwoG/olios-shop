import { Injectable } from '@nestjs/common';

import { User, CustomerProfile, Prisma } from '@prisma/client';

import { BasketsService } from 'src/baskets/baskets.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly basketsService: BasketsService,
  ) {}

  async createProfile(user: User): Promise<CustomerProfile> {
    return this.createProfileInTransaction(user, this.prisma);
  }

  async createProfileInTransaction(
    user: User,
    prisma: Prisma.TransactionClient,
  ): Promise<CustomerProfile> {
    const profile = await prisma.customerProfile.create({
      data: {
        userId: user.id,
      },
    });
    // create basket for customer
    await this.basketsService.createBasketInTransaction(profile.id, prisma);

    return profile;
  }

  async find(id: string): Promise<CustomerProfile> {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { id },
    });
    return profile;
  }

  async findAll(): Promise<CustomerProfile[]> {
    return this.prisma.customerProfile.findMany();
  }
}
