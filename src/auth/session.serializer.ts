import { Injectable } from '@nestjs/common';

import { User } from '../users/user.entity';

import { AuthService } from './auth.service';
import { PassportSerializer } from '@nestjs/passport';

type Done = (err: Error, user: User) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: Done) {
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
