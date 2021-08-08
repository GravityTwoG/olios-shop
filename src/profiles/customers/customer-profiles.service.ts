import { Injectable } from '@nestjs/common';

import { CustomerProfilesRepository } from './customer-profiles.repository';

@Injectable()
export class CustomerProfilesService {
  constructor(
    private readonly customerProfilesRepository: CustomerProfilesRepository,
  ) {}

  // async createProfile(userId: string): Promise<CustomerProfile> {
  // const profile = this.customerProfilesRepository.build();
  // profile.userId = userId;
  // await profile.save();
  // return profile;
  // }
}
