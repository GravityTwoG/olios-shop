import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import type * as Passport from 'passport';

export class LoginAuthGuard implements CanActivate {
  constructor(
    @Inject('PASSPORT') private readonly passport: Passport.Authenticator,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    req.user = await new Promise((resolve, reject) => {
      this.passport.authenticate(
        'local',
        {
          session: true,
        },
        (err, user, info) => {
          try {
            req.authInfo = info;
            return resolve(this.handleRequest(err, user));
          } catch (err) {
            reject(err);
          }
        },
      )(req, res);
    });

    return true;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
