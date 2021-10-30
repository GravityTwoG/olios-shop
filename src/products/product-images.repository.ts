import { EntityRepository, Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';

@EntityRepository(ProductImage)
export class ProductImagesRepository extends Repository<ProductImage> {}
