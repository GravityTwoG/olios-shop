import { createEffect, createEvent, createStore, sample } from 'effector';
import { combineEvents, reset } from 'patronum';

import { IProduct } from '@/src/types/IProduct';
import { ICartItem } from '@/src/types/ICart';
import { IUserRole } from '@/src/types/IUser';
import { toast } from '@/src/shared/toasts';
import * as productsApi from '@/src/shared/api/products';
import * as cartApi from '@/src/shared/api/cart';
import { $user, sessionChecked } from '@/src/shared/session';

// Effects
const fetchProductFx = createEffect<number, IProduct>(async (productId) => {
  return productsApi.fetchProduct(productId);
});

const checkIsInCartFx = createEffect<number, ICartItem>(async (productId) => {
  return cartApi.isInCart(productId);
});

const addToCartFx = createEffect<
  { productId: number; quantity: number },
  ICartItem
>(async (data) => {
  return cartApi.addToCart(data);
});

const removeFromCartFx = createEffect<string, void>((cartItemId) => {
  return cartApi.removeFromCart(cartItemId);
});

const fetchRecommendedProductsFx = createEffect<number, IProduct[]>(
  async (productId) => {
    return productsApi
      .fetchRecommendedProducts({
        take: 12,
        skip: 0,
        productId,
      })
      .then((r) => r.list);
  },
);

// Events
export const pageStarted = createEvent<number>('Product page started');
export const pageMounted = createEvent('Product page mounted');
export const amountInCartChanged = createEvent<number>('Add to cart');
export const addToCart = createEvent('Add to cart');
export const removeFromCart = createEvent('Remove from cart');

const pageMountedAndSessionChecked = combineEvents({
  events: {
    pageMounted,
    sessionChecked,
  },
});

// Stores
export const $product = createStore<IProduct>({
  id: 0,
  name: 'Product name',
  description: 'Product description',
  categoryName: 'Product category',
  categoryId: 0,
  realPrice: 0,
  oldPrice: 0,
  thumbUrl: 'https://via.placeholder.com/200',
  images: ['https://via.placeholder.com/200'],
});

export const $isProductPending = createStore(false);

export const $cartItem = createStore<ICartItem & { isInCart: boolean }>({
  isInCart: false,
  id: '',
  quantity: 1,
  oldPrice: 0,
  realPrice: 0,
  productId: 0,
  productName: '',
  thumbUrl: '',
  sum: 0,
});

export const $isProductInCartPending = createStore(false);

export const $recommendedProducts = createStore<IProduct[]>([]);

export const $areRecommendedProductsPending = createStore(false);

reset({
  clock: pageStarted,
  target: [
    $product,
    $isProductPending,
    $recommendedProducts,
    $cartItem,
    $areRecommendedProductsPending,
  ],
});

sample({
  clock: pageStarted,
  target: [fetchProductFx, fetchRecommendedProductsFx],
});

// Fetch product
$isProductPending.on(fetchProductFx, () => true);

$product.on(fetchProductFx.doneData, (_, product) => product);

fetchProductFx.failData.watch((error) => toast.error(error.message));

$isProductPending.on(fetchProductFx.finally, () => false);

// Fetch recommended products
$areRecommendedProductsPending.on(fetchRecommendedProductsFx, () => true);

$recommendedProducts.on(
  fetchRecommendedProductsFx.doneData,
  (_, result) => result,
);

fetchRecommendedProductsFx.failData.watch((error) =>
  toast.error(error.message),
);

$areRecommendedProductsPending.on(
  fetchRecommendedProductsFx.finally,
  () => false,
);

sample({
  clock: pageMountedAndSessionChecked,
  source: { product: $product, user: $user },
  filter: ({ product, user }) =>
    product.id !== 0 && user.role === IUserRole.CUSTOMER,
  fn: ({ product }) => product.id,
  target: checkIsInCartFx,
});

// Check if product is in cart, Add to Cart, Remove from Cart
sample({
  clock: addToCart,
  source: {
    product: $product,
    cartItem: $cartItem,
  },
  fn: ({ product, cartItem }) => ({
    productId: product.id,
    quantity: cartItem.quantity,
  }),
  target: addToCartFx,
});

sample({
  clock: removeFromCart,
  source: { cartItem: $cartItem },
  fn: ({ cartItem }) => cartItem.id,
  target: removeFromCartFx,
});

$cartItem.on(amountInCartChanged, (cartItem, newValue) => ({
  ...cartItem,
  quantity: newValue,
}));

$isProductInCartPending.on(
  [checkIsInCartFx, addToCartFx, removeFromCartFx],
  () => true,
);

$cartItem.on([checkIsInCartFx.doneData, addToCartFx.doneData], (_, data) => {
  if (data.quantity === 0) {
    return { ...data, quantity: 1, isInCart: false };
  }

  return { ...data, isInCart: true };
});

$cartItem.on(removeFromCartFx.doneData, (cartItem) => {
  return { ...cartItem, quantity: 1, isInCart: false };
});

checkIsInCartFx.failData.watch((error) => toast.error(error.message));
addToCartFx.failData.watch((e) => toast.error(e.message));
removeFromCartFx.failData.watch((e) => toast.error(e.message));

$isProductInCartPending.on(
  [checkIsInCartFx, addToCartFx.finally, removeFromCartFx.finally],
  () => false,
);
