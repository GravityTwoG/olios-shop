import { Resolver, Query, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { UserType } from './user.type';
import { User } from './user.entity';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.getUser({ id });
  }

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
