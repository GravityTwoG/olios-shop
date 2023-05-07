import { Module } from '@nestjs/common';

import { InviteCodesService } from './invite-codes.service';
import { InviteCodesController } from './invite-codes.controller';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Module({
  providers: [InviteCodesService, PrismaService],
  controllers: [InviteCodesController],
  exports: [InviteCodesService],
})
export class InviteCodesModule {}
