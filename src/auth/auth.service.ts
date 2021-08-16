import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { comparePasswords, hashPassword } from './passwords-hashing';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ user: UserDto | null; error?: string }> {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        return { user: null, error: 'Invalid credentials' };
      }
      const areEqual = comparePasswords(user.password, password);
      if (!areEqual) {
        return { user: null, error: 'Invalid credentials' };
      }
      return { user };
    } catch (err) {
      if (err instanceof NotFoundException) {
        return { user: null, error: 'Invalid credentials' };
      }

      return { user: null, error: 'Invalid credentials' };
    }
  }

  async register(registerUserDto: CreateUserDto): Promise<User> {
    return this.createUser(registerUserDto);
  }

  async createUser(registerUserDto: CreateUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const hashedPassword = hashPassword(password);

    return this.usersService.createUser({
      email,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return this.usersService.getUser({ email });
  }
}
