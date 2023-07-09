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
import { plainToInstance } from 'class-transformer';

import { assertTruthy } from 'src/lib/domain/assertions';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { RequestUser } from 'src/auth/types';

import { UpdateUserDTO } from './dto/update-user.dto';
import {
  UserResponseDTO,
  UsersListResponseDTO,
} from './dto/users-response.dto';

import { UsersService } from './users.service';
import { mapUserToDto } from './mapUserToDto';
import { GetUsersDTO } from './dto/get-users.dto';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async user(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserResponseDTO> {
    const user = await this.usersService.getUser({ id });
    return plainToInstance(UserResponseDTO, { data: mapUserToDto(user) });
  }

  @Get()
  async users(@Query() query: GetUsersDTO): Promise<UsersListResponseDTO> {
    const params: Parameters<typeof this.usersService.getUsers>[0] = {
      take: query.take,
      skip: query.skip,
    };

    if (query.searchQuery) {
      const searchQuery = query.searchQuery;
      const formatted = searchQuery.split(' ').join(' | ');
      params.where = {
        OR: [
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } },
          { patronymic: { contains: searchQuery, mode: 'insensitive' } },
          { email: { contains: searchQuery, mode: 'insensitive' } },
          {
            firstName: {
              search: formatted,
              mode: 'insensitive',
            },
          },
          { lastName: { search: formatted, mode: 'insensitive' } },
          { patronymic: { search: formatted, mode: 'insensitive' } },
          { email: { search: formatted, mode: 'insensitive' } },
        ],
      };
    }

    const data = await this.usersService.getUsers(params);
    return plainToInstance(UsersListResponseDTO, {
      data: { count: data.count, list: data.list.map(mapUserToDto) },
    });
  }

  @Post('/:id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDTO,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UserResponseDTO> {
    assertTruthy(
      currentUser.id === id,
      ForbiddenException,
      "You cannot change other users' info.",
    );

    const user = await this.usersService.updateUser(id, data);
    return plainToInstance(UserResponseDTO, { data: mapUserToDto(user) });
  }

  @ApiCookieAuth()
  @HttpCode(200)
  @Roles('MANAGER')
  @Post('/blockOrUnblock/:id')
  async blockOrUnblockUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UserResponseDTO> {
    assertTruthy(
      currentUser.id !== id,
      ForbiddenException,
      'You cannot block/unblock yourself.',
    );

    const user = await this.usersService.setUserIsActive(id, isActive);
    return plainToInstance(UserResponseDTO, { data: mapUserToDto(user) });
  }
}
