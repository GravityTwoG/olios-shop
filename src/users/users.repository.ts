import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  getUser(filter: { id: string } | { email: string }): Promise<User> {
    if ('id' in filter) {
      return this.findOne({
        id: filter.id,
      });
    } else if ('email' in filter) {
      return this.findOne({
        email: filter.email,
      });
    }
  }
}
