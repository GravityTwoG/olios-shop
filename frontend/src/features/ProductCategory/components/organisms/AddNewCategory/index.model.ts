import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { ApiError } from '@/src/shared/api';
import { createCategory } from '@/src/shared/api/product-categories';

export type Image = { raw: Blob | null; preview: string };

const createCategoryFx = createEffect<
  { name: string; icon: Blob },
  void,
  ApiError
>(async ({ name, icon }) => {
  await createCategory(name, icon);
});

export const $name = createStore('');
export const $icon = createStore<Image>({
  raw: null,
  preview: '',
});
export const $isPending = createStore(false);

export const nameChanged = createEvent<string>('');
export const iconChanged = createEvent<Image>('');
export const formSubmitted = createEvent('');
export const categoryCreated = createCategoryFx.done;

$name.on(nameChanged, (_, newValue) => newValue);
$icon.on(iconChanged, (_, newValue) => newValue);

reset({
  clock: categoryCreated,
  target: [$name, $icon],
});

sample({
  source: {
    name: $name,
    icon: $icon,
  },
  clock: formSubmitted,
  filter: ({ name, icon }) => name.trim().length !== 0 && icon.raw !== null,
  fn: ({ name, icon }) => ({ name, icon: icon.raw! }),
  target: createCategoryFx,
});

$isPending.on(createCategoryFx, () => true);
$isPending.on(createCategoryFx.finally, () => false);
