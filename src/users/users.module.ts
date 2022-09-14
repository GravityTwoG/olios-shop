import { Module } from '@nestjs/common';

import { CustomerProfilesModule } from '../profiles/customers/customer-profiles.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [CustomerProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
