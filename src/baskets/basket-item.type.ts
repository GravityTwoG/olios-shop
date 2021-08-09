import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('BasketItem')
export class BasketItemType {
  @Field(() => ID)
  id: string;
}
