import { createEvent, sample } from 'effector';

import {
  CreateCategoryDTO,
  createCategory,
} from '@olios-shop/admin/shared/api/product-categories';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

// Effects
const createCategoryFx = createAPIEffect<CreateCategoryDTO, void>(
  async (data) => {
    await createCategory(data);
  },
);

// Events
export const formSubmitted = createEvent<CreateCategoryDTO>('');
export const categoryCreated = createCategoryFx.call.done;

// Stores
export const $isPending = createCategoryFx.$isPending;

sample({
  clock: formSubmitted,
  target: createCategoryFx.call,
});
