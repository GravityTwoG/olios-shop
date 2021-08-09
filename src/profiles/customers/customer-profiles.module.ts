import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfilesRepository } from './customer-profiles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfilesRepository])],
  providers: [CustomerProfilesService],
  exports: [CustomerProfilesService],
})
export class CustomerProfilesModule {}
