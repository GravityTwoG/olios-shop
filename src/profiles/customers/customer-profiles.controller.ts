import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { CustomerProfile } from '@prisma/client';

import { CustomerProfilesService } from './customer-profiles.service';

@Controller()
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
