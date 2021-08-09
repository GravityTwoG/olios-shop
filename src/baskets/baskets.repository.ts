import { EntityRepository, Repository } from 'typeorm';

import { Basket } from './entities/basket.entity';

@EntityRepository(Basket)
export class BasketsRepository extends Repository<Basket> {}
