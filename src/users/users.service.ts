import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  getUser(filter: { id: string } | { email: string }): Promise<User> {
    if ('id' in filter) {
      return this.userModel.findOne({
        where: {
          id: filter.id,
        },
      });
    }
    if ('email' in filter) {
      return this.userModel.findOne({
        where: {
          id: filter.email,
        },
      });
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser({ id });
    await user.destroy();
  }
}
