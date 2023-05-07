import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  ForbiddenException,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { UsersService } from './users.service';
import { mapUserToDto } from './mapUserToDto';
import { UserOutputDto } from './dto/user-output.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async user(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserOutputDto> {
    const user = await this.usersService.getUser({ id });
    return mapUserToDto(user);
  }

  @Get()
  async users(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
  ): Promise<UserOutputDto[]> {
    const users = await this.usersService.getUsers({ take, skip });
    return users.map(mapUserToDto);
  }

  @Post('/:id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDTO,
    @CurrentUser() currentUser: User,
  ): Promise<UserOutputDto> {
    if (currentUser.id !== id) {
      throw new ForbiddenException("You cannot change other users' info.");
    }
    const user = await this.usersService.updateUser(id, data);
    return mapUserToDto(user);
  }

  @Post('/blockOrUnblock/:id')
  @Roles('MANAGER')
  @ApiCookieAuth()
  async blockOrUnblockUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
    @CurrentUser() currentUser: User,
  ): Promise<UserOutputDto> {
    if (currentUser.id === id) {
      throw new ForbiddenException('You cannot block/unblock yourself.');
    }
    const user = await this.usersService.setUserIsActive(id, isActive);
    return mapUserToDto(user);
  }
}
