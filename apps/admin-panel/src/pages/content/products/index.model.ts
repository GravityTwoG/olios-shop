import { createEffect, createEvent, createStore, sample } from 'effector';

import { ApiError } from '@olios-shop/admin/shared/api';
import {
  CreateProductDTO,
  createProduct,
} from '@olios-shop/admin/shared/api/products';

// Effects
const createProductFx = createEffect<CreateProductDTO, void, ApiError>(
  async (product) => {
    await createProduct(product);
  },
);

// Events
export const formSubmitted = createEvent<CreateProductDTO>(
  'Create product form submitted',
);
export const productCreated = createProductFx.done;

// Stores

export const $isPending = createStore(false);

sample({
  clock: formSubmitted,
  target: createProductFx,
});

$isPending.on(createProductFx, () => true);

$isPending.on(createProductFx.finally, () => false);
