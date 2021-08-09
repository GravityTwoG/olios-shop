import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfilesRepository } from './customer-profiles.repository';
import { CustomerProfilesResolver } from './customer-profiles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfilesRepository])],
  providers: [CustomerProfilesService, CustomerProfilesResolver],
  exports: [CustomerProfilesService],
})
export class CustomerProfilesModule {}
