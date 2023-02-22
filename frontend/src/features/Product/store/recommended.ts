import { createEffect, createEvent, createStore } from 'effector';
import { IProduct } from '../../../types/IProduct';
import { fetchRecommendedProducts } from '../../../api/products';

export const $recommendedProducts = createStore<IProduct[]>([]);

export const setRecommendedProducts = createEvent<IProduct[]>(
  'set recommended products',
);

export const fetchRecommendedProductsFx = createEffect<string, IProduct[]>(
  async (productCategory) => {
    return fetchRecommendedProducts();
  },
);
fetchRecommendedProductsFx.done.watch(({ result }) => {
  setRecommendedProducts(result);
});
fetchRecommendedProductsFx.fail.watch(({ error, params }) => {
  console.log(error, params);
});

$recommendedProducts.on(setRecommendedProducts, (_, payload) => payload);
