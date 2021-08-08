import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { User } from '../users/user.model';

import { AuthService } from './auth.service';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req): Promise<User> {
    return req.user;
  }

  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<User> {
    return req.user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }
}
