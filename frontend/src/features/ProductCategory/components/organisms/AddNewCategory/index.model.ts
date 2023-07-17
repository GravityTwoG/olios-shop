import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { ApiError } from '@/src/shared/api';
import { createCategory } from '@/src/shared/api/product-categories';
import { Image } from '@/src/ui/atoms/ImageInput';

// Effects
const createCategoryFx = createEffect<
  { name: string; icon: Blob },
  void,
  ApiError
>(async ({ name, icon }) => {
  await createCategory(name, icon);
});

// Events
export const nameChanged = createEvent<string>('');
export const iconChanged = createEvent<Image>('');
export const formSubmitted = createEvent('');
export const categoryCreated = createCategoryFx.done;

// Stores
export const $name = createStore('');
export const $icon = createStore<Image>({
  raw: null,
  preview: '',
});
export const $isPending = createStore(false);

$name.on(nameChanged, (_, newValue) => newValue);
$icon.on(iconChanged, (_, newValue) => newValue);

reset({
  clock: categoryCreated,
  target: [$name, $icon],
});

sample({
  clock: formSubmitted,
  source: {
    name: $name,
    icon: $icon,
  },
  filter: ({ name, icon }) => name.trim().length !== 0 && icon.raw !== null,
  fn: ({ name, icon }) => ({ name, icon: icon.raw! }),
  target: createCategoryFx,
});

$isPending.on(createCategoryFx, () => true);
$isPending.on(createCategoryFx.finally, () => false);
