import { createEffect, createEvent, createStore } from 'effector';

import { toast } from '@/src/shared/toasts';
import { fetchRecommendedProducts } from '@/src/shared/api/products';
import { IProduct } from '@/src/types/IProduct';

const RECOMMENDED_PRODUCTS_COUNT = 12;

export const $recommendedProducts = createStore<IProduct[]>([]);

export const setRecommendedProducts = createEvent<IProduct[]>(
  'set recommended products',
);

export const fetchRecommendedProductsFx = createEffect<number, IProduct[]>(
  async (categoryId) => {
    return fetchRecommendedProducts({
      take: RECOMMENDED_PRODUCTS_COUNT,
      skip: 0,
      categoryId,
    }).then((r) => r.list);
  },
);

$recommendedProducts.on(
  fetchRecommendedProductsFx.doneData,
  (_, result) => result,
);

fetchRecommendedProductsFx.failData.watch((error) =>
  toast.error(error.message),
);

$recommendedProducts.on(setRecommendedProducts, (_, payload) => payload);
