import { IProduct } from '../../../types/IProduct';

export const emptyProduct: IProduct = {
  id: 0,
  name: '$Product name',
  description: '$Product description',
  categoryName: '$Product category',
  categoryId: 0,
  realPrice: 9999,
  oldPrice: 19999,
  thumbUrl: 'https://via.placeholder.com/200',
  images: [],
};
