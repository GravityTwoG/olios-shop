import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Authenticator } from 'passport';
import { Request, Response } from 'express';

import { User } from '@prisma/client';

import { UserOutputDto } from 'src/users/dto/user-output.dto';
import { mapUserToDto } from 'src/users/mapUserToDto';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterEmployeeDto } from './dto/register-employee.dto';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('PASSPORT') private readonly passport: Authenticator,
  ) {}

  private handleRequest(err: any, user: User, info: any): User {
    if (err || !user) {
      if (info && info.message) {
        throw new UnauthorizedException(info.message);
      }

      if (err) {
        throw err;
      }

      throw new UnauthorizedException();
    }
    return user;
  }

  @ApiCookieAuth()
  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<UserOutputDto> {
    return mapUserToDto(user);
  }

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  async login(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<UserOutputDto> {
    const user = await new Promise<User>((resolve, reject) => {
      this.passport.authenticate(
        'local',
        {
          session: true,
        },
        (err: string, user: User, info: string) => {
          try {
            req.authInfo = info;
            return resolve(this.handleRequest(err, user, info));
          } catch (err) {
            reject(err);
          }
        },
      )(req, res);
    });

    req.user = user;
    (req.session as any).user = user;
    res.send(mapUserToDto(user));
    res.end();
    return mapUserToDto(user);
  }

  @Post('/register-customer')
  async registerCustomer(
    @Body() registerUserDto: RegisterCustomerDto,
  ): Promise<UserOutputDto> {
    const user = await this.authService.registerCustomer(registerUserDto);
    return mapUserToDto(user);
  }

  @Post('/register-employee')
  async registerEmployee(
    @Body() registerEmployeeDto: RegisterEmployeeDto,
  ): Promise<UserOutputDto> {
    const user = await this.authService.registerEmployee(registerEmployeeDto);
    return mapUserToDto(user);
  }

  @ApiCookieAuth()
  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await (req.session as any).destroy();
    await res.clearCookie('connect.sid');
    return { message: 'Logged out' };
  }
}
