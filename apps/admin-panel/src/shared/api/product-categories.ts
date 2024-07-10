import {
  IProductCategory,
  ProductCategorySchema,
} from '@olios-shop/admin/types/IProductCategory';

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

export type CreateCategoryDTO = {
  name: string;
  categoryIcon: Blob;
  parentId: number | null;
};

export const createCategory = async (
  data: CreateCategoryDTO,
): Promise<IProductCategory> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('icon', data.categoryIcon);
  formData.append(
    'parentId',
    data.parentId !== null ? data.parentId.toString() : 'null',
  );

  const response = await axiosInstance.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return ProductCategoryResponseSchema.parse(response.data).data;
};

export const fetchCategory = async (
  categoryId: number,
): Promise<IProductCategory> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${categoryId}`);

  return ProductCategoryResponseSchema.parse(response.data).data;
};

export const fetchCategories = async (
  query: PaginationQueryDTO & {
    name?: string;
    parentId?: number | null;
  },
): Promise<ListDTO<IProductCategory>> => {
  const params: Record<string, unknown> = query;

  if (query.parentId === null) {
    params.parentId = 'null';
  }

  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params });

  return ProductCategoryListSchema.parse(response.data).data;
};

export type UpdateCategoryDTO = {
  id: number;
} & Partial<{ name: string; categoryIcon: Blob; parentId: number | null }>;

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

  if (category.parentId === null) {
    formData.append('parentId', 'null');
  } else if (category.parentId !== undefined) {
    formData.append('parentId', category.parentId.toString());
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
