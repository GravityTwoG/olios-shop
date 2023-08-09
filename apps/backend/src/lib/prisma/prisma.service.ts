import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name);

  constructor() {
    super({ log: ['query', 'error', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();
    this.enablePerformanceLogging(
      process.env.NODE_ENV === 'production' ? 'long_queries' : 'all_queries',
    );
  }

  private enablePerformanceLogging(log: 'all_queries' | 'long_queries'): void {
    (this as any).$on('query', (e: any) => {
      if (log === 'all_queries') {
        if (e.query !== 'SELECT 1') {
          this.logger.log(
            `query: ${e.query}, params: ${e.params}, duration: ${e.duration} ms`,
          );
        }
      }

      if (log === 'long_queries') {
        if (e.duration >= 2000) {
          this.logger.warn(
            `query is slow: ${e.query}, params: ${e.params}, execution time: ${e.duration} ms`,
          );
        }
      }
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
