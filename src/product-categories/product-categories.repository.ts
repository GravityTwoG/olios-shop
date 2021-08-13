import { EntityRepository, Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';

@EntityRepository(ProductCategory)
export class ProductCategoriesRepository extends Repository<ProductCategory> {}
