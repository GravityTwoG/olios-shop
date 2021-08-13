import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {}
