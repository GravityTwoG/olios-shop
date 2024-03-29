import { createEffect, createEvent, createStore, sample } from 'effector';

import { ApiError } from '@/src/shared/api';
import {
  CreateCategoryDTO,
  createCategory,
} from '@/src/shared/api/product-categories';

// Effects
const createCategoryFx = createEffect<CreateCategoryDTO, void, ApiError>(
  async (data) => {
    await createCategory(data);
  },
);

// Events
export const formSubmitted = createEvent<CreateCategoryDTO>('');
export const categoryCreated = createCategoryFx.done;

// Stores
export const $isPending = createStore(false);

sample({
  clock: formSubmitted,
  target: createCategoryFx,
});

$isPending.on(createCategoryFx, () => true);
$isPending.on(createCategoryFx.finally, () => false);
