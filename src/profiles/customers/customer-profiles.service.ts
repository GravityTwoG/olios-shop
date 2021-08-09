import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

  async find(id: string): Promise<CustomerProfile> {
    const profile = await this.customerProfilesRepository.findOne(
      { id },
      { loadRelationIds: true },
    );
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  async findAll(): Promise<CustomerProfile[]> {
    return this.customerProfilesRepository.find({ loadRelationIds: true });
  }
}
