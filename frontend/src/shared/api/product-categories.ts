import {
  IProductCategory,
  ProductCategorySchema,
} from '@/src/types/IProductCategory';

import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

const ProductCategoryResponseSchema = createResponseSchema(
  ProductCategorySchema,
);
const ProductCategoryListSchema = createListResponseSchema(
  ProductCategorySchema,
);

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

  return ProductCategoryResponseSchema.parse(response.data).data;
};

export const fetchCategories = async (
  query: PaginationQueryDTO & { name?: string },
): Promise<ListDTO<IProductCategory>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductCategoryListSchema.parse(response.data).data;
};

export type UpdateCategoryDTO = {
  id: number;
} & Partial<{ name: string; categoryIcon: Blob }>;

export const updateCategory = async (
  category: UpdateCategoryDTO,
): Promise<IProductCategory> => {
  const formData = new FormData();
  formData.append('id', category.id.toString());
  if (category.name) {
    formData.append('name', category.name);
  }
  if (category.categoryIcon) {
    formData.append('icon', category.categoryIcon);
  }

  const response = await axiosInstance.put(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return ProductCategoryResponseSchema.parse(response.data).data;
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await axiosInstance.delete(`${BASE_ROUTE}/${categoryId}`);
};
