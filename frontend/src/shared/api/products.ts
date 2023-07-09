import { IProduct } from '@/src/features/Product/store';
import { ProductSchema } from '@/src/types/IProduct';
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

  return ProductResponseSchema.parse(response.data).data;
};

export const fetchProduct = async (productId: number): Promise<IProduct> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${productId}`);
  return ProductResponseSchema.parse(response.data).data;
};

export const fetchProducts = async (
  query: PaginationQueryDTO,
): Promise<ListDTO<IProduct>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductListSchema.parse(response.data).data;
};

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO & { categoryId: number },
): Promise<ListDTO<IProduct>> => {
  const { categoryId, ...q } = query;
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: q });

  return ProductListSchema.parse(response.data).data;
};
