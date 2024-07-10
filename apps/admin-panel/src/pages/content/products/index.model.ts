import { createEvent, sample } from 'effector';

import { createAPIEffect } from '@olios-shop/admin/shared/effector';
import {
  CreateProductDTO,
  createProduct,
} from '@olios-shop/admin/shared/api/products';
import { toast } from '@olios-shop/admin/shared/toasts';

// Effects
const createProductFx = createAPIEffect<CreateProductDTO, void>(
  async (product) => {
    await createProduct(product);
  },
);

// Events
export const formSubmitted = createEvent<CreateProductDTO>(
  'Create product form submitted',
);
export const productCreated = createProductFx.call.done;

// Stores

export const $isPending = createProductFx.$isPending;

sample({
  clock: formSubmitted,
  target: createProductFx.call,
});

createProductFx.call.failData.watch((e) => {
  toast.error(e.message);
});
