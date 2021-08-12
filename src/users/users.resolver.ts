import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { UserType } from './user.type';
import { UserDto } from './dto/user.dto';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType)
  async user(
    @Args('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserDto> {
    return this.usersService.getUser({ id });
  }

  @Query(() => [UserType])
  async users(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }
}
