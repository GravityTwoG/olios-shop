import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/user.entity';
import { UserType } from '../../users/user.type';

@ObjectType('CustomerProfile')
export class CustomerProfileType {
  @Field()
  id: string;

  // @Field(() => UserType)
  // user: UserType;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  street: string;

  @Field()
  house: string;

  @Field()
  floor: number;

  @Field()
  flat: string;
}
