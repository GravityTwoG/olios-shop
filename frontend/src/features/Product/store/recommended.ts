import { createEffect, createEvent, createStore } from 'effector';
import { IProduct } from '../../../types/IProduct';
import { fetchRecommendedProducts } from '@/src/shared/api/products';

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
    });
  },
);
fetchRecommendedProductsFx.done.watch(({ result }) => {
  setRecommendedProducts(result);
});
fetchRecommendedProductsFx.fail.watch(({ error, params }) => {
  console.log(error, params);
});

$recommendedProducts.on(setRecommendedProducts, (_, payload) => payload);
