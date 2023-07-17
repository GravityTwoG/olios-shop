import { ProductSchema, IProduct } from '@/src/types/IProduct';
import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

const BASE_ROUTE = '/products';

const ProductResponseSchema = createResponseSchema(ProductSchema);
const ProductListSchema = createListResponseSchema(ProductSchema);

export type CreateProductDTO = {
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

  return ProductResponseSchema.parse(response.data).data;
};

export const fetchProduct = async (productId: number): Promise<IProduct> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${productId}`);
  return ProductResponseSchema.parse(response.data).data;
};

export const fetchProducts = async (
  query: PaginationQueryDTO & { searchQuery: string },
): Promise<ListDTO<IProduct>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductListSchema.parse(response.data).data;
};

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO & { productId: number },
): Promise<ListDTO<IProduct>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/recommended`, {
    params: query,
  });

  return ProductListSchema.parse(response.data).data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await axiosInstance.delete(`${BASE_ROUTE}/${productId}`);
};
