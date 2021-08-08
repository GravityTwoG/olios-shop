import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

import { RegisterUserDto } from './dto/register-user.dto';
import { comparePasswords, hashPassword } from './passwords-hashing';

const PG_DUPLICATION_ERROR_CODE = '23505';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const areEqual = comparePasswords(user.password, password);
    if (!areEqual) {
      return null;
    }
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.createUser(registerUserDto);
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const hashedPassword = hashPassword(password);

    try {
      const user = await this.usersService.createUser({
        email,
        password: hashedPassword,
      }); // should be awaited here to catch db errors
      return user;
    } catch (e) {
      if (e.code === PG_DUPLICATION_ERROR_CODE) {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersService.getUser({ email });
  }
}
