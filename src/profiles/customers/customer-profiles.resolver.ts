import { Args, Query, Resolver } from '@nestjs/graphql';

import { CustomerProfilesService } from './customer-profiles.service';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerProfileType } from './customer-profile.type';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => CustomerProfileType)
export class CustomerProfilesResolver {
  constructor(
    private readonly customerProfilesService: CustomerProfilesService,
  ) {}

  @Query(() => CustomerProfileType)
  customerProfile(
    @Args('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerProfile> {
    return this.customerProfilesService.find(id);
  }

  @Query(() => [CustomerProfileType])
  customerProfiles(): Promise<CustomerProfile[]> {
    return this.customerProfilesService.findAll();
  }
}
