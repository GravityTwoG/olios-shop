import { IProduct } from '@/src/features/Product/store';
import { axiosInstance } from './instance';
import { PaginationQueryDTO } from './types';

const BASE_ROUTE = '/product-categories';

export const createCategory = async (
  name: string,
  categoryIcon: Blob,
): Promise<any[]> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('icon', categoryIcon);

  const response = await axiosInstance.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const fetchCategories = async (
  query: PaginationQueryDTO,
): Promise<any[]> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return response.data;
};
