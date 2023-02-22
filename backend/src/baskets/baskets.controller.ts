import { Controller } from '@nestjs/common';

import { Basket } from '@prisma/client';

import { BasketsService } from './baskets.service';

@Controller()
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  // @Query(() => [BasketType], { name: 'baskets' })
  // findAll(): Promise<Basket[]> {
  //   return this.basketsService.findAll();
  // }

  // @Query(() => BasketType, { name: 'basket' })
  // findOne(@Args('id', { type: () => ID }) id: string): Promise<Basket> {
  //   return this.basketsService.findOne(id);
  // }

  // @Mutation(() => BasketType)
  // updateBasket(
  //   @Args('updateBasketInput') updateBasketInput: UpdateBasketInput,
  // ) {
  //   return this.basketsService.update(updateBasketInput.id, updateBasketInput);
  // }
}
