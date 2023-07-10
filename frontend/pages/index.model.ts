import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { ApiError, ListDTO } from '@/src/shared/api/lib';
import { fetchProducts } from '@/src/shared/api/products';
import { toast } from '@/src/shared/toasts';
import { IProduct } from '@/src/types/IProduct';

const fetchProductsFx = createEffect<
  { pageSize: number; pageNumber: number; searchQuery: string },
  ListDTO<IProduct> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, searchQuery }) => {
  const result = await fetchProducts({
    take: pageSize,
    skip: pageSize * pageNumber,
    searchQuery,
  });
  return {
    ...result,
    pageNumber,
  };
});

export const pageMounted = createEvent('Page mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

export const $products = createStore<IProduct[]>([]);
export const $productsCount = createStore(0);
export const $searchQuery = createStore('');
export const $pageSize = createStore(24);
export const $pageNumber = createStore(0);
export const $isPending = createStore(false);

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: pageMounted,
  target: [$products, $productsCount, $pageSize, $pageNumber, $isPending],
});

sample({
  clock: [pageMounted, searchTriggered],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchProductsFx,
});

sample({
  clock: loadPage,
  source: { pageSize: $pageSize, searchQuery: $searchQuery },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchProductsFx,
});

$isPending.on(fetchProductsFx, () => true);

$products.on(fetchProductsFx.doneData, (_, { list }) => list);

$productsCount.on(fetchProductsFx.doneData, (_, { count }) => count);

$pageNumber.on(fetchProductsFx.doneData, (_, { pageNumber }) => pageNumber);

fetchProductsFx.failData.watch((error) => {
  toast.error(error.message);
});

$isPending.on(fetchProductsFx.finally, () => false);
