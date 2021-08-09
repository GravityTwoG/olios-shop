import { Injectable, NotFoundException } from '@nestjs/common';

import { BasketsRepository } from './baskets.repository';
import { Basket } from './entities/basket.entity';

import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketInput } from './dto/update-basket.input';

@Injectable()
export class BasketsService {
  constructor(private readonly basketsRepository: BasketsRepository) {}

  generateBasket(createBasketDto: CreateBasketDto): Basket {
    const { customerProfile } = createBasketDto;
    return this.basketsRepository.create({
      customerProfile,
    });
  }

  async create(createBasketDto: CreateBasketDto): Promise<Basket> {
    const basket = this.generateBasket(createBasketDto);
    return this.basketsRepository.save(basket);
  }

  findAll(): Promise<Basket[]> {
    return this.basketsRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string): Promise<Basket> {
    const basket = await this.basketsRepository.findOne(
      { id },
      { loadRelationIds: true },
    );
    if (!basket) {
      throw new NotFoundException();
    }
    return basket;
  }

  // async update(
  //   id: string,
  //   updateBasketInput: UpdateBasketInput,
  // ): Promise<Basket> {
  //   const {} = updateBasketInput;
  //   return this.basketsRepository.update({ id }, {});
  // }
}
