import { createEvent, createStore } from 'effector';

// PRODUCTS CATEGORY
export const $productsCategory = createStore<string>('');

export const setCategory = createEvent<string>('set products category');

$productsCategory.on(setCategory, (_, payload) => payload);
