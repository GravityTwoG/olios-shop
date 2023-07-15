import { createEffect, createEvent, createStore, sample } from 'effector';

import * as categoriesApi from '@/src/shared/api/product-categories';
import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';

// Effects
export const updateCategoryFx = createEffect<
  categoriesApi.UpdateCategoryDTO,
  void,
  ApiError
>(async (category: categoriesApi.UpdateCategoryDTO) => {
  await categoriesApi.updateCategory(category);
});

const deleteCategoryFx = createEffect<number, void, ApiError>(
  (categoryId: number) => {
    return categoriesApi.deleteCategory(categoryId);
  },
);

// Events
export const deleteCategory = createEvent<number>('Delete category');
export const categoryUpdated = updateCategoryFx.done;
export const categoryDeleted = deleteCategoryFx.done;

// Stores
export const $isDeleting = createStore(false);

sample({
  clock: deleteCategory,
  target: deleteCategoryFx,
});

$isDeleting.on(deleteCategoryFx, () => true);

deleteCategoryFx.failData.watch((e) => toast.error(e.message));

$isDeleting.on(deleteCategoryFx.finally, () => false);
