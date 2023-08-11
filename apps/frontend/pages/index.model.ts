import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { ApiError, ListDTO } from '@/src/shared/api/lib';
import { fetchProducts } from '@/src/shared/api/products';
import { IProduct } from '@/src/types/IProduct';

// Effects
const fetchProductsFx = createEffect<
  {
    pageSize: number;
    pageNumber: number;
    searchQuery: string;
    categoryId: number;
  },
  ListDTO<IProduct> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, searchQuery, categoryId }) => {
  const result = await fetchProducts({
    take: pageSize,
    skip: pageSize * pageNumber,
    searchQuery,
    categoryId: categoryId || null,
  });

  return {
    ...result,
    pageNumber,
  };
});

// Events
export const pageStarted = createEvent<number>('Page mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');

const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $products = createStore<IProduct[]>([]);
export const $productsCount = createStore(0);
export const $searchQuery = createStore('');
export const $categoryId = createStore<number>(0);
export const $pageSize = createStore(24);
export const $pageNumber = createStore(0);
export const $isPending = createStore(false);

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: pageStarted,
  target: [
    $products,
    $productsCount,
    $categoryId,
    $pageSize,
    $pageNumber,
    $isPending,
  ],
});

$categoryId.on(pageStarted, (_, newCategoryId) => newCategoryId);

sample({
  clock: pageStarted,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  fn: ({ pageSize, pageNumber, searchQuery }, categoryId) => ({
    pageSize,
    pageNumber,
    searchQuery,
    categoryId,
  }),
  target: fetchProductsFx,
});

sample({
  clock: searchTriggered,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
    categoryId: $categoryId,
  },
  target: fetchProductsFx,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
    searchQuery: $searchQuery,
    categoryId: $categoryId,
  },
  fn: ({ pageSize, searchQuery, categoryId }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
    categoryId,
  }),
  target: fetchProductsFx,
});

$isPending.on(fetchProductsFx, () => true);

$products.on(fetchProductsFx.doneData, (_, { list }) => list);
$productsCount.on(fetchProductsFx.doneData, (_, { count }) => count);
$pageNumber.on(fetchProductsFx.doneData, (_, { pageNumber }) => pageNumber);

$products.on(fetchProductsFx.fail, () => []);
$productsCount.on(fetchProductsFx.fail, () => 0);

fetchProductsFx.failData.watch((error) => {
  console.error(error);
});

$isPending.on(fetchProductsFx.finally, () => false);
