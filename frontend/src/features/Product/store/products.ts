import { createEffect, createEvent, createStore } from 'effector';
import { IProduct } from '../../../types/IProduct';
import { fetchProducts } from '../../../api/products';

// PAGE SIZE
const PAGE_SIZE = 24;
export const $pageSize = createStore<number>(PAGE_SIZE);

export const setPageSize = createEvent<number>('set page size');

$pageSize.on(setPageSize, (_, payload) => payload);

// PRODUCTS
export const $products = createStore<IProduct[]>([]);

export const setProducts = createEvent<IProduct[]>('set products');

$products.on(setProducts, (_, payload) => payload);

export const fetchProductsFx = createEffect<void, IProduct[]>(async () => {
  return fetchProducts({ take: $pageSize.getState(), skip: 0 });
});
fetchProductsFx.done.watch(({ result }) => {
  setProducts(result);
});
fetchProductsFx.fail.watch(({ error, params }) => {
  console.log(error, params);
});

// PRODUCTS CATEGORY
export const $productsCategory = createStore<string>('');

export const setCategory = createEvent<string>('set products category');

$productsCategory.on(setCategory, (_, payload) => payload);
