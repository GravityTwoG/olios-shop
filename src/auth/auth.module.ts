import { Module } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy } from 'passport-local';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    {
      provide: 'PASSPORT',
      inject: [AuthService],
      useFactory: (authService) => {
        return passport.use(
          'local',
          new Strategy(
            {
              usernameField: 'email',
              passwordField: 'password',
              session: true,
            },
            async (email: string, password: string, done) => {
              const user = await authService.validateUser(email, password);
              if (!user) {
                done('User is not valid', user);
              } else {
                done(null, user);
              }
            },
          ),
        );
      },
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
