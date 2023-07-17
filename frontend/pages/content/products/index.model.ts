import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { ApiError } from '@/src/shared/api';
import { CreateProductDTO, createProduct } from '@/src/shared/api/products';

// Effects
const createProductFx = createEffect<CreateProductDTO, void, ApiError>(
  async (product) => {
    await createProduct(product);
  },
);

// Events
export const nameChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();
export const priceChanged = createEvent<number>();
export const categoryChanged = createEvent<{ label: string; value: string }>();
export const imagesChanged = createEvent<
  {
    raw: Blob;
    preview: string;
  }[]
>();

export const formSubmitted = createEvent();
export const productCreated = createProductFx.done;

// Stores
export const $name = createStore('');
export const $description = createStore('');
export const $price = createStore(0);
export const $category = createStore({ label: '', value: '' });

export const $images = createStore<{ raw: Blob; preview: string }[]>([]);

export const $isPending = createStore(false);

$name.on(nameChanged, (_, newValue) => newValue);
$description.on(descriptionChanged, (_, newValue) => newValue);
$price.on(priceChanged, (_, newValue) => newValue);
$category.on(categoryChanged, (_, newValue) => newValue);
$images.on(imagesChanged, (_, images) => images);

sample({
  clock: formSubmitted,
  source: {
    name: $name,
    description: $description,
    price: $price,
    category: $category,
    images: $images,
  },
  filter: ({ images }) => images.length !== 0,
  fn: ({ name, description, price, category, images }) => {
    return {
      name,
      description,
      price,
      categoryId: Number(category.value),
      images: images.map((i) => i.raw),
    };
  },
  target: createProductFx,
});

$isPending.on(createProductFx, () => true);

reset({
  clock: createProductFx.done,
  target: [$name, $description, $price, $category, $images],
});

$isPending.on(createProductFx.finally, () => false);
