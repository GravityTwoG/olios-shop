import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { Product } from './entities/product.entity';
import { ProductType } from './product.type';

export function mapProductEntityToProductType(product: Product): ProductType {
  const returnValue = {
    id: product.id,
    categoryId: product.category as unknown as number,
    description: product.description,
    name: product.name,
    oldPrice: product.oldPrice,
    realPrice: product.realPrice,
    thumbUrl: product.thumbUrl,
    images: product.images.map((im) => im.imageUrl),
  };

  if (product.category instanceof ProductCategory) {
    returnValue.categoryId = product.category.id;
  }

  return returnValue;
}
