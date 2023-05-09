import { IProduct } from '../../../types/IProduct';
import { createEffect, createEvent, createStore } from 'effector';
import { fetchProduct } from '../../../api/products';
import { emptyProduct } from './entities';

export const $product = createStore<IProduct>(emptyProduct);

export const setProduct = createEvent<IProduct>('set product');

$product.on(setProduct, (_, product) => product);

export const fetchProductFx = createEffect<number, IProduct>(
  async (productId) => {
    return fetchProduct(productId);
  },
);
fetchProductFx.done.watch(({ result }) => {
  setProduct(result);
});
fetchProductFx.fail.watch(({ error, params }) => {
  console.log(error, params);
});

export const $productCategory = createStore<string>('');
export const setProductCategory = createEvent<string>('set product category');
