import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { BasketsService } from './baskets.service';
import { Basket } from './entities/basket.entity';
import { BasketType } from './basket.type';

@Resolver(() => Basket)
export class BasketsResolver {
  constructor(private readonly basketsService: BasketsService) {}

  @Query(() => [BasketType], { name: 'baskets' })
  findAll(): Promise<Basket[]> {
    return this.basketsService.findAll();
  }

  @Query(() => BasketType, { name: 'basket' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Basket> {
    return this.basketsService.findOne(id);
  }

  // @Mutation(() => BasketType)
  // updateBasket(
  //   @Args('updateBasketInput') updateBasketInput: UpdateBasketInput,
  // ) {
  //   return this.basketsService.update(updateBasketInput.id, updateBasketInput);
  // }
}
