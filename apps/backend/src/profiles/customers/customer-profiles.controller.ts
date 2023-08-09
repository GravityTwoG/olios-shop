import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { CustomerProfilesService } from './customer-profiles.service';

import {
  CustomerProfileResponseDTO,
  CustomerProfilesListResponseDTO,
} from './dto/customer-profiles-response.dto';
import { GetCustomerProfilesDTO } from './dto/get-customer-profiles.dto';

@ApiTags('Customer profiles')
@Controller('customer-profiles')
export class CustomerProfilesController {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
  ) {}

  @Get('/:id')
  @ApiCookieAuth()
  async customerProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerProfileResponseDTO> {
    const data = await this.customerProfilesService.find(id);
    return { data };
  }

  @ApiCookieAuth()
  @Roles('MANAGER')
  @Get()
  async customerProfiles(
    @Query() query: GetCustomerProfilesDTO,
  ): Promise<CustomerProfilesListResponseDTO> {
    const data = await this.customerProfilesService.findAll(query);
    return { data };
  }
}
