import { Module } from '@nestjs/common';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfilesController } from './customer-profiles.controller';
import { BasketsModule } from 'src/baskets/baskets.module';

@Module({
  imports: [BasketsModule],
  providers: [CustomerProfilesService],
  controllers: [CustomerProfilesController],
  exports: [CustomerProfilesService],
})
export class CustomerProfilesModule {}
