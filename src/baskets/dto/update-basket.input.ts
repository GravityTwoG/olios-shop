import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BASKET_ITEM_UUID_VERSION } from '../entities/basket-item.entity';

@InputType()
export class UpdateBasketInput {
  @IsUUID(BASKET_ITEM_UUID_VERSION)
  @Field(() => ID)
  id: string;
}
