import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InviteCode, Prisma } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { BaseListDTO } from 'src/common/dto/base-list.dto';
import { InviteCodeDTO } from './dto/invite-code.dto';

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

  async getInviteCode(
    codeWhereUniqueInput: Prisma.InviteCodeWhereUniqueInput,
  ): Promise<InviteCode> {
    return this.prisma.inviteCode.findUniqueOrThrow({
      where: codeWhereUniqueInput,
    });
  }

  async getInviteCodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InviteCodeWhereUniqueInput;
    where?: Prisma.InviteCodeWhereInput;
  }): Promise<BaseListDTO<InviteCodeDTO>> {
    const { skip, take, cursor, where } = params;

    const list = await this.prisma.inviteCode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: [{ createdAt: 'desc' }, { isUsed: 'asc' }, { id: 'desc' }],
    });
    const count = await this.prisma.inviteCode.count({
      where,
    });
    return { list, count };
  }

  async updateInviteCode(params: {
    where: Prisma.InviteCodeWhereUniqueInput;
    data: Prisma.InviteCodeUpdateInput;
  }): Promise<InviteCode> {
    return this.updateInviteCodeInTransaction(params, this.prisma);
  }

  async updateInviteCodeInTransaction(
    params: {
      where: Prisma.InviteCodeWhereUniqueInput;
      data: Prisma.InviteCodeUpdateInput;
    },
    prisma: Prisma.TransactionClient,
  ): Promise<InviteCode> {
    const { where, data } = params;
    return prisma.inviteCode.update({
      data,
      where,
    });
  }

  async deleteInviteCode(
    where: Prisma.InviteCodeWhereUniqueInput,
  ): Promise<void> {
    await this.prisma.inviteCode.findFirstOrThrow({
      where: { ...where, isUsed: false },
    });
    await this.prisma.inviteCode.delete({
      where: where,
    });
  }
}
