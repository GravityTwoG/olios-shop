import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InviteCode, Prisma } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { BaseListDTO } from 'src/lib/dto/base-list.dto';
import { InviteCodeDTO } from './dto/invite-code.dto';
import { GetInviteCodesDTO } from './dto/get-invite-codes.dto';

@Injectable()
export class InviteCodesService {
  constructor(private prisma: PrismaService) {}

  async createInviteCode(
    createInviteCodeDto: CreateInviteCodeDto,
  ): Promise<InviteCode> {
    return this.prisma.inviteCode.create({
      data: {
        role: createInviteCodeDto.role,
        firstName: createInviteCodeDto.firstName,
        lastName: createInviteCodeDto.lastName,
        patronymic: createInviteCodeDto.patronymic,
        birthDate: createInviteCodeDto.birthDate,
        code: randomUUID().toUpperCase(),
        isUsed: false,
        usedBy: null,
      },
    });
  }

  async getInviteCode(code: string): Promise<InviteCode> {
    return this.prisma.inviteCode.findUniqueOrThrow({
      where: {
        code: code,
      },
    });
  }

  async getInviteCodes(
    dto: GetInviteCodesDTO,
  ): Promise<BaseListDTO<InviteCodeDTO>> {
    const where: Prisma.InviteCodeWhereInput = {};

    if (dto.searchQuery) {
      where.OR = [
        ...this.prisma.createSearchQuery('firstName', dto.searchQuery),
        ...this.prisma.createSearchQuery('lastName', dto.searchQuery),
        ...this.prisma.createSearchQuery('patronymic', dto.searchQuery),
      ];
    }

    const list = await this.prisma.inviteCode.findMany({
      take: dto.take,
      skip: dto.skip,
      where,
      orderBy: [{ createdAt: 'desc' }, { isUsed: 'asc' }, { id: 'desc' }],
    });
    const count = await this.prisma.inviteCode.count({
      where,
    });
    return { list, count };
  }

  async updateInviteCode(
    code: string,
    data: {
      isUsed: boolean;
      usedBy: string;
    },
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<InviteCode> {
    return prisma.inviteCode.update({
      where: {
        code: code,
      },
      data: data,
    });
  }

  async deleteInviteCode(id: string): Promise<void> {
    await this.prisma.inviteCode.deleteMany({
      where: { id: id, isUsed: false },
    });
  }
}
