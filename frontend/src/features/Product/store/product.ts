import { IProduct } from '../../../types/IProduct';
import { createEffect, createEvent, createStore } from 'effector';
import { fetchProduct } from '@/src/shared/api/products';
import { emptyProduct } from './entities';
import { toast } from '@/src/shared/toasts';

export const fetchProductFx = createEffect<number, IProduct>(
  async (productId) => {
    return fetchProduct(productId);
  },
);

export const $product = createStore<IProduct>(emptyProduct);
export const $productCategory = createStore<string>('');

export const setProduct = createEvent<IProduct>('set product');
export const setProductCategory = createEvent<string>('set product category');

$product.on(setProduct, (_, product) => product);

$product.on(fetchProductFx.doneData, (_, product) => product);

fetchProductFx.failData.watch((error) => toast.error(error.message));
