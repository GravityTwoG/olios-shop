import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { toast } from '@/src/shared/toasts';

import * as productsApi from '@/src/shared/api/products';
import { ApiError, ListDTO } from '@/src/shared/api/lib';
import { IProduct } from '@/src/types/IProduct';
import { productCreated } from '../index.model';

// Effects
const fetchProductsFx = createEffect<
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
export const $isPending = createStore(false);

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
  target: fetchProductsFx,
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
  target: fetchProductsFx,
});

$isPending.on(fetchProductsFx, () => true);

$products.on(fetchProductsFx.doneData, (_, { list }) => {
  return list;
});
$productsCount.on(fetchProductsFx.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchProductsFx.doneData, (_, { pageNumber }) => pageNumber);

fetchProductsFx.failData.watch((e) => toast.error(e.message));

$isPending.on(fetchProductsFx.finally, () => false);

//
const deleteProductFx = createEffect<number, void, ApiError>(
  (productId: number) => {
    return productsApi.deleteProduct(productId);
  },
);

export const $isDeleting = createStore(false);

export const deleteProduct = createEvent<number>('Delete product');

sample({
  clock: deleteProduct,
  target: deleteProductFx,
});

$isDeleting.on(deleteProductFx, () => true);

deleteProductFx.failData.watch((e) => toast.error(e.message));

$isDeleting.on(deleteProductFx.finally, () => false);

sample({
  clock: deleteProductFx.done,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchProductsFx,
});
