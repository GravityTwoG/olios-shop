import { createEffect, createEvent, sample } from 'effector';

import * as categoriesApi from '@olios-shop/admin/shared/api/product-categories';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';
import { toast } from '@olios-shop/admin/shared/toasts';
import { ApiError } from '@olios-shop/admin/shared/api';

// Effects
const updateCategoryFx = createEffect<
  categoriesApi.UpdateCategoryDTO,
  void,
  ApiError
>(async (category: categoriesApi.UpdateCategoryDTO) => {
  await categoriesApi.updateCategory(category);
});

const deleteCategoryFx = createAPIEffect<number, void>((categoryId: number) => {
  return categoriesApi.deleteCategory(categoryId);
});

// Events
export const updateCategory =
  createEvent<categoriesApi.UpdateCategoryDTO>('Update category');
export const deleteCategory = createEvent<number>('Delete category');
export const categoryUpdated = updateCategoryFx.done;
export const categoryDeleted = deleteCategoryFx.call.done;

// Stores
export const $isDeleting = deleteCategoryFx.$isPending;

sample({
  clock: updateCategory,
  target: updateCategoryFx,
});

updateCategoryFx.failData.watch((e) => toast.error(e.message));

sample({
  clock: deleteCategory,
  target: deleteCategoryFx.call,
});

deleteCategoryFx.call.failData.watch((e) => toast.error(e.message));
