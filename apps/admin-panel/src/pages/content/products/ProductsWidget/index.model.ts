import { createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { toast } from '@olios-shop/admin/shared/toasts';

import * as productsApi from '@olios-shop/admin/shared/api/products';
import { ApiError, ListDTO } from '@olios-shop/admin/shared/api/lib';
import { IProduct } from '@olios-shop/admin/types/IProduct';
import { productCreated } from '../index.model';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

// Effects
const fetchProductsFx = createAPIEffect<
  {
    pageSize: number;
    pageNumber: number;
    searchQuery: string;
  },
  ListDTO<IProduct> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, searchQuery }) => {
  const result = await productsApi.fetchProducts({
    take: pageSize,
    skip: pageSize * pageNumber,
    searchQuery,
    categoryId: null,
  });
  return { ...result, pageNumber };
});

// Events
export const mounted = createEvent('Mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $products = createStore<IProduct[]>([]);
export const $productsCount = createStore(0);
export const $searchQuery = createStore('');
export const $pageSize = createStore(12);
export const $pageNumber = createStore(0);
export const $isPending = fetchProductsFx.$isPending;

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: mounted,
  target: [$products, $productsCount, $pageSize, $pageNumber, $isPending],
});

sample({
  clock: [mounted, searchTriggered, productCreated],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchProductsFx.call,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
    searchQuery: $searchQuery,
  },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchProductsFx.call,
});

$products.on(fetchProductsFx.call.doneData, (_, { list }) => {
  return list;
});
$productsCount.on(fetchProductsFx.call.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(
  fetchProductsFx.call.doneData,
  (_, { pageNumber }) => pageNumber,
);

fetchProductsFx.call.failData.watch((e) => toast.error(e.message));

//
const deleteProductFx = createAPIEffect<number, void>((productId: number) => {
  return productsApi.deleteProduct(productId);
});

export const $isDeleting = deleteProductFx.$isPending;

export const deleteProduct = createEvent<number>('Delete product');

sample({
  clock: deleteProduct,
  target: deleteProductFx.call,
});

deleteProductFx.call.failData.watch((e) => toast.error(e.message));

sample({
  clock: deleteProductFx.call.done,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchProductsFx.call,
});
