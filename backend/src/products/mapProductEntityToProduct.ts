import { ProductEntity } from './products.service';

export function mapProductEntityToProductType(product: ProductEntity): any {
  const returnValue = {
    id: product.id,
    categoryId: product.categoryId,
    categoryName: product.productCategory ? product.productCategory.name : '',
    description: product.description,
    name: product.name,
    oldPrice: product.oldPrice,
    realPrice: product.realPrice,
    thumbUrl: product.productImages.length
      ? `http://localhost:9000/${product.productImages[0].imagePath}`
      : 'product.thumbUrl',
    images: product.productImages.map((im) => im.imagePath),
  };

  return returnValue;
}
