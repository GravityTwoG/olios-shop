import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { CustomerProfile } from '@prisma/client';

import { CustomerProfilesService } from './customer-profiles.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Customer profiles')
@Controller('customer-profiles')
export class CustomerProfilesController {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
  ) {}

  @Get('/:id')
  @ApiCookieAuth()
  customerProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerProfile> {
    return this.customerProfilesService.find(id);
  }

  @Get()
  @Roles('MANAGER')
  @ApiCookieAuth()
  customerProfiles(): Promise<CustomerProfile[]> {
    return this.customerProfilesService.findAll();
  }
}
