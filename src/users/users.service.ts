import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUser(filter: { id: string } | { email: string }): Promise<User> {
    return this.usersRepository.getUser(filter);
  }

  async createUser(createUserDto: RegisterUserDto): Promise<User> {
    const user = await this.usersRepository.createUser(createUserDto);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
  }
}
