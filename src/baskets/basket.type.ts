import { ObjectType, Field, ID } from '@nestjs/graphql';

import { BasketItemType } from './basket-item.type';

@ObjectType('Basket')
export class BasketType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  customerProfile: string;

  @Field(() => [BasketItemType])
  basketItems: BasketItemType[];
}
