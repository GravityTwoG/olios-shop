import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createSearchQuery } from 'src/common/prisma/createSearchQuery';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['query', 'error', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  createSearchQuery = createSearchQuery;
}
