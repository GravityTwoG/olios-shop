import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { BaseListDTO } from 'src/lib/dto/base-list.dto';

import { CustomerProfilesService } from '../profiles/customers/customer-profiles.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { GetUsersDTO } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
    private readonly prisma: PrismaService,
  ) {}

  //
  async createCustomer(
    createUserDto: Omit<CreateUserDto, 'role'>,
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
    } = createUserDto;
    const user = await prisma.user.create({
      data: {
        role: UserRole.CUSTOMER,
        email,
        password,
        passwordSalt,
        birthDate,
        firstName,
        lastName,
        patronymic,
      },
    });

    await this.customerProfilesService.createProfile(user, prisma);

    return user;
  }

  async createEmployee(
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

    return user;
  }

  async getUsers(dto: GetUsersDTO): Promise<BaseListDTO<User>> {
    const where: Prisma.UserWhereInput = {};

    if (dto.searchQuery) {
      where.OR = [
        ...this.prisma.createSearchQuery('firstName', dto.searchQuery),
        ...this.prisma.createSearchQuery('lastName', dto.searchQuery),
        ...this.prisma.createSearchQuery('patronymic', dto.searchQuery),
        ...this.prisma.createSearchQuery('email', dto.searchQuery),
      ];
    }

    const users = await this.prisma.user.findMany({
      take: dto.take,
      skip: dto.skip,
      where: where,
    });
    const count = await this.prisma.user.count({ where: where });

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

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
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
