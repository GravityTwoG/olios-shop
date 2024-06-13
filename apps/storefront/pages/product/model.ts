import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { IProduct } from '@olios-shop/storefront/types/IProduct';
import { ICartItem } from '@olios-shop/storefront/types/ICart';
import { toast } from '@olios-shop/storefront/shared/toasts';
import * as productsApi from '@olios-shop/storefront/shared/api/products';
import * as cartApi from '@olios-shop/storefront/shared/api/cart';
import { ApiError } from '@olios-shop/storefront/shared/api';

import {
  $user,
  $isSessionChecked,
  $isAuthenticated,
  sessionChecked,
  SessionUserRole,
} from '@olios-shop/storefront/shared/session';

// Effects
const fetchProductFx = createEffect<number, IProduct, ApiError>(
  async (productId) => {
    return productsApi.fetchProduct(productId);
  },
);

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

const checkIsInCartFx = createEffect<
  { isAuthenticated: boolean; productId: number; cookie: string },
  ICartItem
>(async (data) => {
  return cartApi.isInCart(data);
});

const addToCartFx = createEffect<
  { isAuthenticated: boolean; productId: number; quantity: number },
  ICartItem
>(async (data) => {
  return cartApi.addToCart(data);
});

const removeFromCartFx = createEffect<
  { isAuthenticated: boolean; cartItemId: string },
  void
>((data) => {
  return cartApi.removeFromCart(data);
});

// Events
export const pageStarted = createEvent<{ productId: number; cookie: string }>(
  'Product page started',
);
export const productChanged = createEvent('Product changed');
export const amountInCartChanged = createEvent<number>('Add to cart');
export const addToCart = createEvent('Add to cart');
export const removeFromCart = createEvent('Remove from cart');

// Stores
export const $product = createStore<IProduct & { isFound: boolean }>({
  id: 0,
  name: 'Product name',
  description: 'Product description',
  categoryName: 'Product category',
  categoryId: 0,
  realPrice: 0,
  oldPrice: 0,
  thumbUrl: 'https://via.placeholder.com/200',
  images: ['https://via.placeholder.com/200'],
  isFound: false,
});

export const $productNotFound = createStore(false);

export const $recommendedProducts = createStore<IProduct[]>([]);

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

reset({
  clock: pageStarted,
  target: [$product, $recommendedProducts, $cartItem, $isProductInCartPending],
});

sample({
  clock: pageStarted,
  fn: ({ productId }) => productId,
  target: [fetchProductFx, fetchRecommendedProductsFx],
});

// Fetch product
$product.on(fetchProductFx.doneData, (_, product) => ({
  ...product,
  isFound: true,
}));

$productNotFound.on(fetchProductFx.failData, (_, err) => {
  return err.statusCode === 404;
});

fetchProductFx.failData.watch((err) => {
  console.error(err);
});

// Fetch recommended products
$recommendedProducts.on(
  fetchRecommendedProductsFx.doneData,
  (_, result) => result,
);

fetchRecommendedProductsFx.failData.watch((err) => {
  console.error(err);
});

// Cart logic
// must executed on server
sample({
  clock: pageStarted,
  fn: ({ cookie, productId }) => ({
    // we assume that user is logged, so we can check cart on backend
    isAuthenticated: true,
    productId,
    cookie,
  }),
  target: checkIsInCartFx,
});

// must executed on client and only for anonymous user
// because cart for anonymous user is stored in localStorage
sample({
  clock: sessionChecked,
  source: {
    product: $product,
    isAuthenticated: $isAuthenticated,
  },
  filter: ({ isAuthenticated }) => !isAuthenticated,
  fn: ({ product }) => ({
    isAuthenticated: false,
    productId: product.id,
    cookie: '',
  }),
  target: checkIsInCartFx,
});

sample({
  clock: productChanged,
  source: {
    product: $product,
    isAuthenticated: $isAuthenticated,
    isSessionChecked: $isSessionChecked,
  },
  filter: ({ isAuthenticated, isSessionChecked }) =>
    isSessionChecked && !isAuthenticated,
  fn: ({ product }) => ({
    isAuthenticated: false,
    productId: product.id,
    cookie: '',
  }),
  target: checkIsInCartFx,
});

sample({
  clock: addToCart,
  source: {
    product: $product,
    cartItem: $cartItem,
    user: $user,
    isAuthenticated: $isAuthenticated,
    isSessionChecked: $isSessionChecked,
  },
  filter: ({ product, user, isSessionChecked }) =>
    product.id !== 0 &&
    isSessionChecked &&
    (user.role === SessionUserRole.ANONYMOUS ||
      user.role === SessionUserRole.CUSTOMER),
  fn: ({ product, cartItem, isAuthenticated }) => ({
    isAuthenticated,
    productId: product.id,
    quantity: cartItem.quantity,
  }),
  target: addToCartFx,
});

sample({
  clock: removeFromCart,
  source: {
    cartItem: $cartItem,
    user: $user,
    isAuthenticated: $isAuthenticated,
    isSessionChecked: $isSessionChecked,
  },
  filter: ({ user, isSessionChecked }) =>
    isSessionChecked &&
    (user.role === SessionUserRole.ANONYMOUS ||
      user.role === SessionUserRole.CUSTOMER),
  fn: ({ cartItem, isAuthenticated }) => ({
    isAuthenticated,
    cartItemId: cartItem.id,
  }),
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
