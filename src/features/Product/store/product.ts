import { IProduct } from './types';
import { createEffect, createEvent, createStore } from 'effector';
import { fetchProduct } from '../api';
import { emptyProduct } from './entities';

export const $product = createStore<IProduct>(emptyProduct);

export const setProduct = createEvent<IProduct>('set product');

export const fetchProductFx = createEffect<string, IProduct>(
  async (productId) => {
    return fetchProduct();
  },
);
fetchProductFx.done.watch(({ result }) => {
  setProduct(result);
});
fetchProductFx.fail.watch(({ error, params }) => {
  console.log(error, params);
});

export const $productCategory = createStore<string>('');
export const setProductCategory = createEvent<string>('set product category');
