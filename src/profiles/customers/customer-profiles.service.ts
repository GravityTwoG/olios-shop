import { Injectable } from '@nestjs/common';

import { User } from '../../users/user.entity';

import { CustomerProfilesRepository } from './customer-profiles.repository';
import { CustomerProfile } from './customer-profile.entity';

@Injectable()
export class CustomerProfilesService {
  constructor(
    private readonly customerProfilesRepository: CustomerProfilesRepository,
  ) {}

  async createProfile(user: User): Promise<CustomerProfile> {
    const profile = this.generateProfile(user);
    return this.customerProfilesRepository.save(profile);
  }

  generateProfile(user: User): CustomerProfile {
    return this.customerProfilesRepository.create({ user });
  }
}
