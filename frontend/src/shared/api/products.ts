import { z } from 'zod';

import { IProduct } from '@/src/features/Product/store';
import { axiosInstance } from './lib/instance';
import { PaginationQueryDTO } from './lib/types';
import { ProductSchema } from '@/src/types/IProduct';

const BASE_ROUTE = '/products';

const ProductListSchema = z.array(ProductSchema);

type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  images: Blob[];
};

export const createProduct = async (
  data: CreateProductDTO,
): Promise<IProduct> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('realPrice', data.price.toString());
  formData.append('categoryId', data.categoryId.toString());

  for (const image of data.images) {
    formData.append('images', image);
  }

  const response = await axiosInstance.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return ProductSchema.parse(response.data);
};

export const fetchProduct = async (productId: number): Promise<IProduct> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${productId}`);
  return ProductSchema.parse(response.data);
};

export const fetchProducts = async (
  query: PaginationQueryDTO,
): Promise<IProduct[]> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductListSchema.parse(response.data);
};

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO & { categoryId: number },
): Promise<IProduct[]> => {
  const { categoryId, ...q } = query;
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: q });

  return ProductListSchema.parse(response.data);
};
