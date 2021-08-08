import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

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

  async createUser(createUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = this.create({
      email,
      password,
    });
    return this.save(user);
  }
}
