import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { BaseListDTO } from 'src/common/dto/base-list.dto';

import { CustomerProfilesService } from '../profiles/customers/customer-profiles.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
    private readonly prisma: PrismaService,
  ) {}

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationAndSearchRelevanceInput>;
  }): Promise<BaseListDTO<User>> {
    const users = await this.prisma.user.findMany(params);
    const count = await this.prisma.user.count({ where: params.where });
    return { count, list: users };
  }

  async getUser(filter: { id: string } | { email: string }): Promise<User> {
    if ('id' in filter) {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: filter.id },
      });
      return user;
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: filter.email },
    });
    return user;
  }

  //
  async createUser(
    createUserDto: CreateUserDto,
    prisma: Prisma.TransactionClient,
  ): Promise<User> {
    const {
      email,
      password,
      passwordSalt,
      birthDate,
      firstName,
      lastName,
      patronymic,
      role,
    } = createUserDto;
    const user = await prisma.user.create({
      data: {
        role,
        email,
        password,
        passwordSalt,
        birthDate,
        firstName,
        lastName,
        patronymic,
      },
    });

    if (user.role == UserRole.CUSTOMER) {
      // create customer profile
      await this.customerProfilesService.createProfile(user, prisma);
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const update: Partial<UpdateUserDTO> & { [key: string]: any } = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        update[key] = value;
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...update,
      },
    });
  }

  async setUserIsActive(id: string, isActive: boolean) {
    return this.prisma.user.update({ where: { id }, data: { isActive } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}