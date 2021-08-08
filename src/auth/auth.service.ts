import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../users/user.model';

import { comparePasswords, hashPassword } from './passwords-hashing';
import { RegisterUserDto } from './dto/register-user.dto';

const PG_DUPLICATION_ERROR_CODE = '23505';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

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

  async register(registerUserInput: RegisterUserDto) {
    return this.createUser(registerUserInput);
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const hashedPassword = hashPassword(password);

    try {
      const user = this.userModel.build();
      user.email = email;
      user.password = hashedPassword;
      await user.save(); // should be awaited here to catch db errors
      return user;
    } catch (e) {
      if (e.parent?.code === PG_DUPLICATION_ERROR_CODE) {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }
}
