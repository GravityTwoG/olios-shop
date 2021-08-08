import { EntityRepository, Repository } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';

@EntityRepository(CustomerProfile)
export class CustomerProfilesRepository extends Repository<CustomerProfile> {}
