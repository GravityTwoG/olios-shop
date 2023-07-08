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
  HttpCode,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { assertTruthy } from 'src/lib/domain/assertions';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { RequestUser } from 'src/auth/types';

import { UserOutputDto } from './dto/user-output.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersListOutpudDTO } from './dto/users-list-output.dto';

import { UsersService } from './users.service';
import { mapUserToDto } from './mapUserToDto';

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
  ): Promise<UsersListOutpudDTO> {
    const data = await this.usersService.getUsers({ take, skip });
    return data;
  }

  @Post('/:id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDTO,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UserOutputDto> {
    assertTruthy(
      currentUser.id === id,
      ForbiddenException,
      "You cannot change other users' info.",
    );

    const user = await this.usersService.updateUser(id, data);
    return mapUserToDto(user);
  }

  @Roles('MANAGER')
  @ApiCookieAuth()
  @HttpCode(200)
  @Post('/blockOrUnblock/:id')
  async blockOrUnblockUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UserOutputDto> {
    assertTruthy(
      currentUser.id !== id,
      ForbiddenException,
      'You cannot block/unblock yourself.',
    );

    const user = await this.usersService.setUserIsActive(id, isActive);
    return mapUserToDto(user);
  }
}
