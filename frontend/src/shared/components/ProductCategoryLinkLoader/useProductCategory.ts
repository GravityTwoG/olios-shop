import useSWR from 'swr';

import { IProductCategory } from '@/src/types/IProductCategory';

import { fetchCategory } from '../../api/product-categories';
import { ApiError } from '../../api';
import { toast } from '../../toasts';

export const useProductCategory = (categoryId: number | null) => {
  const { data: category } = useSWR<IProductCategory | undefined, ApiError>(
    `/api/product-categories/${categoryId || 'null'}`,
    () => (categoryId !== null ? fetchCategory(categoryId) : undefined),
    {
      onError(e) {
        toast.error(e.message);
      },
    },
  );

  return category;
};
