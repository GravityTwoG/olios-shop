import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Prisma, User, UserRole } from '@prisma/client';

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
  }): Promise<User[]> {
    const users = await this.prisma.user.findMany(params);
    return users;
  }

  async getUser(filter: { id: string } | { email: string }): Promise<User> {
    if ('id' in filter) {
      const user = await this.prisma.user.findUnique({
        where: { id: filter.id },
      });
      return user;
    }

    const user = await this.prisma.user.findUnique({
      where: { email: filter.email },
    });
    return user;
  }

  //
  async createUserInTransaction(
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
      await this.customerProfilesService.createProfileInTransaction(
        user,
        prisma,
      );
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const update: Partial<UpdateUserDTO> = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        update[key] = data[key];
      }
    });

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
