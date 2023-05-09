import { IProduct } from '@/src/features/Product/store';
import { axiosInstance } from './instance';
import { PaginationQueryDTO } from './types';

const BASE_ROUTE = '/products';

export const fetchProduct = async (): Promise<IProduct> => {
  return axiosInstance.get(`${BASE_ROUTE}`);
};

export const fetchProducts = async (
  query: PaginationQueryDTO,
): Promise<IProduct[]> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return response.data;
};

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO,
): Promise<IProduct[]> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return response.data;
};
