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
} from '@nestjs/common';

import { User } from '../users/user.entity';

import { AuthService } from './auth.service';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user): Promise<User> {
    return user;
  }

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Req() req,
    @Session() session: Record<string, any>,
  ): Promise<User> {
    session.user = req.user;
    return req.user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    await req.session.destroy();
    res.clearCookie('connect.sid');
    throw new UnauthorizedException();
  }
}
