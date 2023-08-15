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
import { Response } from 'express';

import { User } from '@prisma/client';

import { mapUserToDto } from 'src/users/mapUserToDto';
import { UserResponseDTO } from 'src/users/dto/users-response.dto';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Request, RequestUser } from './types';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterEmployeeDto } from './dto/register-employee.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('PASSPORT') private readonly passport: Authenticator,
  ) {}

  @ApiCookieAuth()
  @Get('/me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: RequestUser): UserResponseDTO {
    return { data: mapUserToDto(user) };
  }

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponseDTO> {
    const user = await new Promise<User>((resolve, reject) => {
      const authenticateReturn = this.passport.authenticate(
        'local',
        { session: true },
        (err: string, user: User | false | null, info: string) => {
          try {
            req.authInfo = info;

            const u = this.handleRequest(err, user, info);

            return resolve(u);
          } catch (err) {
            reject(err);
          }
        },
      ) as (req: Request, res: Response) => void;

      authenticateReturn(req, res);
    });

    req.user = user;
    req.session.user = user;
    return { data: mapUserToDto(user) };
  }

  private handleRequest(
    err: string,
    user: User | false | null,
    info: undefined | string | { message: string },
  ): User {
    if (err || !user) {
      if (typeof info === 'string') {
        throw new UnauthorizedException(info);
      }

      if (info && 'message' in info) {
        throw new UnauthorizedException(info.message);
      }

      if (err) {
        throw err;
      }

      throw new UnauthorizedException();
    }
    return user;
  }

  @Post('/register-customer')
  async registerCustomer(
    @Body() registerUserDto: RegisterCustomerDto,
  ): Promise<UserResponseDTO> {
    const user = await this.authService.registerCustomer(registerUserDto);
    return { data: mapUserToDto(user) };
  }

  @Post('/register-employee')
  async registerEmployee(
    @Body() registerEmployeeDto: RegisterEmployeeDto,
  ): Promise<UserResponseDTO> {
    const user = await this.authService.registerEmployee(registerEmployeeDto);
    return { data: mapUserToDto(user) };
  }

  @ApiCookieAuth()
  @Post('/logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.session.destroy((err) => console.error(err));

    res.clearCookie('connect.sid');
    return { message: 'Logged out' };
  }
}
