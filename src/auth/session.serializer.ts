import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

type Done = (err: Error, user: UserDto) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: UserDto, done: Done) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Done) {
    const user = await this.authService.findUserByEmail(payload.email);
    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  }
}
