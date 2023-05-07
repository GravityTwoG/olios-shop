import { Injectable, OnModuleInit } from '@nestjs/common';
import { InviteCode, Prisma, UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DomainException } from 'src/domain.exception';

import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CreateInviteCodeDto } from './dto/create-invite-code.dto';

@Injectable()
export class InviteCodesService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.createStartInviteCode();
  }

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
    orderBy?: Prisma.Enumerable<Prisma.InviteCodeOrderByWithRelationAndSearchRelevanceInput>;
  }): Promise<InviteCode[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.inviteCode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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

  private async createStartInviteCode(): Promise<InviteCode> {
    const code = 'FIRST_MANAGER';

    const invite = await this.prisma.inviteCode.findFirst({
      where: {
        code,
      },
    });

    if (invite) {
      return invite;
    }

    return this.prisma.inviteCode.create({
      data: {
        firstName: 'FirstName',
        lastName: 'LastName',
        patronymic: 'Patronymic',
        birthDate: new Date(),
        role: UserRole.MANAGER,
        code,
        isUsed: false,
        usedBy: null,
      },
    });
  }
}
