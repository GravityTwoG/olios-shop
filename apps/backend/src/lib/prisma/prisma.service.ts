import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { createSearchQuery } from 'src/common/prisma/createSearchQuery';

const clientOptions = {
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
} satisfies Prisma.PrismaClientOptions;

@Injectable()
export class PrismaService
  extends PrismaClient<typeof clientOptions>
  implements OnModuleInit
{
  private logger = new Logger(PrismaService.name);

  constructor() {
    super(clientOptions);

    this.$on('query', (e) => {
      this.logger.log('Query: ' + e.query);
      this.logger.log('Params: ' + e.params);
      this.logger.log('Duration: ' + e.duration + 'ms');
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  createSearchQuery = createSearchQuery;
}
