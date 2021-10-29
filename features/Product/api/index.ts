import { IProduct } from '../store';

const productMock = {
  id: 1,
  name: 'Seat',
  desc: 'Seat description',
  price: 199,
  lastPrice: 299,
  imgUrl: 'https://via.placeholder.com/200',
  imgSize: '200',
};

export const fetchProduct = async (): Promise<IProduct> => {
  return productMock;
};

export const fetchProducts = async (): Promise<IProduct[]> => {
  return [productMock];
};

export const fetchRecommendedProducts = async (): Promise<IProduct[]> => {
  return [productMock];
};
