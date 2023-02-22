import { Product, ProductCategory } from '@prisma/client';

export function mapProductEntityToProductType(product: Product): Product {
  // const returnValue = {
  //   id: product.id,
  //   categoryId: product.category as unknown as number,
  //   description: product.description,
  //   name: product.name,
  //   oldPrice: product.oldPrice,
  //   realPrice: product.realPrice,
  //   thumbUrl: product.thumbUrl,
  //   images: product.images.map((im) => im.imageUrl),
  // };

  // if (product.category instanceof ProductCategory) {
  //   returnValue.categoryId = product.category.id;
  // }

  // return returnValue;
  return product;
}
