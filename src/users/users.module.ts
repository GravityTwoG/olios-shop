import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerProfilesModule } from '../profiles/customers/customer-profiles.module';
import { CustomerProfilesService } from '../profiles/customers/customer-profiles.service';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    CustomerProfilesModule,
  ],
  providers: [UsersService, UsersResolver, CustomerProfilesService],
  exports: [TypeOrmModule, UsersService, CustomerProfilesService],
})
export class UsersModule {}
