import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';

import { comparePasswords, hashPassword } from './core/passwords-hashing';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ user: User | null; error?: string }> {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        return { user: null, error: 'Invalid credentials' };
      }
      const areEqual = comparePasswords({
        hashedPassword: user.password,
        passwordSalt: user.passwordSalt,
        enteredPassword: password,
      });
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

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.createUser(registerUserDto);
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password, birthDate, firstName, lastName, patronymic } =
      registerUserDto;
    const { salt, hash } = hashPassword(password);

    return this.usersService.createUser({
      email,
      passwordSalt: salt,
      password: hash,
      birthDate,
      firstName,
      lastName,
      patronymic,
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersService.getUser({ email });
  }
}
