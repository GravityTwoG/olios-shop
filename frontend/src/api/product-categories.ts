import { IProduct } from '@/src/features/Product/store';
import { axiosInstance } from './lib/instance';
import {
  ListOutputDTO,
  PaginationQueryDTO,
  createListOutputSchema,
} from './lib/types';
import {
  IProductCategory,
  ProductCategorySchema,
} from '../types/IProductCategory';

const ProductCategoryListSchema = createListOutputSchema(ProductCategorySchema);

const BASE_ROUTE = '/product-categories';

export const createCategory = async (
  name: string,
  categoryIcon: Blob,
): Promise<IProductCategory> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('icon', categoryIcon);

  const response = await axiosInstance.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return ProductCategorySchema.parse(response.data);
};

export const fetchCategories = async (
  query: PaginationQueryDTO,
): Promise<ListOutputDTO<IProductCategory>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductCategoryListSchema.parse(response.data);
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  const response = await axiosInstance.delete(`${BASE_ROUTE}/${categoryId}`);

  return response.data;
};
