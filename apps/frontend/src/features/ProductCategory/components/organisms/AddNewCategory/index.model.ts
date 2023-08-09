import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { ApiError } from '@/src/shared/api';
import {
  CreateCategoryDTO,
  createCategory,
} from '@/src/shared/api/product-categories';
import { Image } from '@/src/ui/atoms/ImageInput';

// Effects
const createCategoryFx = createEffect<CreateCategoryDTO, void, ApiError>(
  async (data) => {
    await createCategory(data);
  },
);

// Events
export const nameChanged = createEvent<string>('');
export const iconChanged = createEvent<Image>('');
export const parentCategoryChanged = createEvent<{
  label: string;
  value: string;
}>('');
export const formSubmitted = createEvent('');
export const categoryCreated = createCategoryFx.done;

// Stores
export const $name = createStore('');
export const $icon = createStore<Image>({
  raw: null,
  preview: '',
});
export const $parentCategory = createStore<{
  label: string;
  value: string;
}>({
  label: 'Not selected',
  value: '',
});
export const $isPending = createStore(false);

$name.on(nameChanged, (_, newValue) => newValue);
$icon.on(iconChanged, (_, newValue) => newValue);
$parentCategory.on(parentCategoryChanged, (_, newValue) => newValue);

reset({
  clock: categoryCreated,
  target: [$name, $icon],
});

sample({
  clock: formSubmitted,
  source: {
    name: $name,
    icon: $icon,
    parent: $parentCategory,
  },
  filter: ({ name, icon }) => name.trim().length !== 0 && icon.raw !== null,
  fn: ({ name, icon, parent }) => ({
    name,
    categoryIcon: icon.raw!,
    parentId: parent.value.trim().length ? Number(parent.value) : null,
  }),
  target: createCategoryFx,
});

$isPending.on(createCategoryFx, () => true);
$isPending.on(createCategoryFx.finally, () => false);
