import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerProfile } from '@prisma/client';

import { CustomerProfilesService } from './customer-profiles.service';

@ApiTags('Customer profiles')
@Controller('customer-profiles')
export class CustomerProfilesController {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
  ) {}

  @Get('/:id')
  customerProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerProfile> {
    return this.customerProfilesService.find(id);
  }

  @Get()
  customerProfiles(): Promise<CustomerProfile[]> {
    return this.customerProfilesService.findAll();
  }
}
