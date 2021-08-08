import { Module } from '@nestjs/common';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfilesRepository } from './customer-profiles.repository';

@Module({
  providers: [CustomerProfilesService, CustomerProfilesRepository],
})
export class CustomerProfilesModule {}
