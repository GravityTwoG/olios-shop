import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import passport from 'passport';
import { Strategy } from 'passport-local';

import { User } from '@prisma/client';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { InviteCodesModule } from './invite-codes/invite-codes.module';
import { RolesGuard } from './guards/roles.guard';

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
            async (
              email: string,
              password: string,
              done: (
                error: string,
                user: User | false,
                data?: { message: string },
              ) => void,
            ) => {
              const { user, error } = await authService.validateUser(
                email,
                password,
              );
              if (!user) {
                done('', false, { message: error });
              } else {
                done('', user);
              }
            },
          ),
        );
      },
    },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
