import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUser(filter: { id: string } | { email: string }): Promise<User> {
    if ('id' in filter) {
      return this.usersRepository.findOne({
        where: {
          id: filter.id,
        },
      });
    }
    if ('email' in filter) {
      return this.usersRepository.findOne({
        where: {
          id: filter.email,
        },
      });
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser({ id });
    // await user.destroy();
  }
}
