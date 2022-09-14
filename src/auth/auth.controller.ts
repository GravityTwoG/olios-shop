import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as passport from 'passport';
import { Response } from 'express';

import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';

import { UserOutputDto } from 'src/users/dto/user-output.dto';
import { mapUserToDto } from 'src/users/mapUserToDto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('PASSPORT') private readonly passport: passport.Authenticator,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<UserOutputDto> {
    return mapUserToDto(user);
  }

  private handleRequest(err, user: User, info: any): User {
    if (err || !user) {
      if (info && info.message) {
        throw new UnauthorizedException(info.message);
      }

      if (err) {
        throw err;
      } else {
        throw new UnauthorizedException();
      }
    }
    return user;
  }

  @Post('/login')
  async login(@Req() req, @Res() res: Response): Promise<UserOutputDto> {
    req.user = await new Promise((resolve, reject) => {
      this.passport.authenticate(
        'local',
        {
          session: true,
        },
        (err, user, info) => {
          try {
            req.authInfo = info;
            return resolve(this.handleRequest(err, user, info));
          } catch (err) {
            reject(err);
          }
        },
      )(req, res);
    });

    req.session.user = req.user;
    res.send(mapUserToDto(req.user));
    res.end();
    return mapUserToDto(req.user);
  }

  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserOutputDto> {
    const user = await this.authService.register(registerUserDto);
    return mapUserToDto(user);
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res: Response) {
    await req.session.destroy();
    await res.clearCookie('connect.sid');
    res.send({ message: 'Logged out' });
    res.end();
  }
}
