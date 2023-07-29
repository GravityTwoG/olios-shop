import { Module } from '@nestjs/common';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfilesController } from './customer-profiles.controller';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [CartsModule],
  providers: [CustomerProfilesService],
  controllers: [CustomerProfilesController],
  exports: [CustomerProfilesService],
})
export class CustomerProfilesModule {}
