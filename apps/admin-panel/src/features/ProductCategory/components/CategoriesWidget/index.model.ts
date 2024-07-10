import { createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { toast } from '@olios-shop/admin/shared/toasts';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

import { IProductCategory } from '@olios-shop/admin/types/IProductCategory';
import * as categoriesApi from '@olios-shop/admin/shared/api/product-categories';
import { ListDTO } from '@olios-shop/admin/shared/api/lib';
import { categoryCreated } from '../AddNewCategory/index.model';
import {
  categoryDeleted,
  categoryUpdated,
} from './ProductCategoryItem/index.model';

// Effects
const fetchCategoriesFx = createAPIEffect<
  {
    pageSize: number;
    pageNumber: number;
    name: string;
  },
  ListDTO<IProductCategory> & { pageNumber: number }
>(async ({ pageSize, pageNumber, name }) => {
  const result = await categoriesApi.fetchCategories({
    take: pageSize,
    skip: pageSize * pageNumber,
    name,
  });
  return { ...result, pageNumber };
});

// Events
export const mounted = createEvent('Mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $categories = createStore<IProductCategory[]>([]);
export const $categoriesCount = createStore(0);
export const $searchQuery = createStore('');
export const $pageSize = createStore(12);
export const $pageNumber = createStore(0);
export const $isPending = fetchCategoriesFx.$isPending;

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: mounted,
  target: [$categories, $categoriesCount, $pageSize, $pageNumber, $isPending],
});

sample({
  clock: [
    mounted,
    searchTriggered,
    categoryCreated,
    categoryUpdated,
    categoryDeleted,
  ],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    name: $searchQuery,
  },
  target: fetchCategoriesFx.call,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
    name: $searchQuery,
  },
  fn: ({ pageSize, name }, pageNumber) => ({ pageSize, pageNumber, name }),
  target: fetchCategoriesFx.call,
});

$categories.on(fetchCategoriesFx.call.doneData, (_, { list }) => {
  return list;
});
$categoriesCount.on(fetchCategoriesFx.call.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(
  fetchCategoriesFx.call.doneData,
  (_, { pageNumber }) => pageNumber,
);

fetchCategoriesFx.call.failData.watch((e) => toast.error(e.message));
