import useSWR from 'swr';

import { IProductCategory } from '@olios-shop/frontend/types/IProductCategory';

import { fetchCategory } from '../../api/product-categories';
import { ApiError } from '../../api';
import { toast } from '../../toasts';

export const useProductCategory = (categoryId: number | null) => {
  const { data: category } = useSWR<IProductCategory | undefined, ApiError>(
    `/api/product-categories/${categoryId || 'null'}`,
    () =>
      categoryId !== null && categoryId !== 0
        ? fetchCategory(categoryId)
        : undefined,
    {
      onError(e) {
        toast.error(e.message);
      },
    },
  );

  return category;
};
