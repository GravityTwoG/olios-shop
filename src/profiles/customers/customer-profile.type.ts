import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserType } from '../../users/user.type';
import { BasketType } from '../../baskets/basket.type';

@ObjectType('CustomerProfile')
export class CustomerProfileType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  basket: string;

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
