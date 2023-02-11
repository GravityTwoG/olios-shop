import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import passport from 'passport';
import { Strategy } from 'passport-local';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { InviteCodesModule } from './invite-codes/invite-codes.module';

@Module({
  imports: [
    UsersModule,
    InviteCodesModule,
    RouterModule.register([
      {
        path: 'auth',
        module: InviteCodesModule,
      },
    ]),
  ],
  providers: [
    AuthService,
    {
      provide: 'PASSPORT',
      inject: [AuthService],
      useFactory: (authService: AuthService) => {
        return passport.use(
          'local',
          new Strategy(
            {
              usernameField: 'email',
              passwordField: 'password',
              session: true,
            },
            async (email: string, password: string, done) => {
              const { user, error } = await authService.validateUser(
                email,
                password,
              );
              if (!user) {
                done('', false, { message: error });
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
