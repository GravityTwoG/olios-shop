import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';

import { ICart } from '@olios-shop/storefront/types/ICart';
import { toast } from '@olios-shop/storefront/shared/toasts';
import * as cartApi from '@olios-shop/storefront/shared/api/cart';

import { $isAuthenticated } from '@olios-shop/storefront/shared/session';

// Effects
const createCartFx = createEffect<string, ICart>((name) => {
  return cartApi.createCart(name);
});

const fetchCartsFx = attach({
  source: { isAuthenticated: $isAuthenticated },
  effect: createEffect(async (data: { isAuthenticated: boolean }) => {
    return cartApi.fetchCarts(data);
  }),
});

const fetchCartFx = createEffect<
  {
    isAuthenticated: boolean;
    cartId: string;
  },
  ICart
>((data) => {
  return cartApi.fetchCartById(data);
});

const selectAsDefaultFx = createEffect<string, ICart>(async (cartId) => {
  return cartApi.selectAsDefault(cartId);
});

const deleteCartFx = createEffect<string, void>((cartId) => {
  return cartApi.deleteCart(cartId);
});

const removeFromCartFx = createEffect<
  {
    isAuthenticated: boolean;
    cartItemId: string;
  },
  void
>((data) => {
  return cartApi.removeFromCart(data);
});

// Events
export const pageMounted = createEvent('Cart page mounted');
export const loadCart = createEvent<string>('Load cart');
export const selectedAsDefault = createEvent('Selected as default');
export const cartCreated = createCartFx.done;
export const cartDeleted = createEvent('Cart deleted');

export const removeFromCart = createEvent<string>('Remove from cart');

// Stores
export const $carts = createStore<cartApi.ICartFromList[]>([]);

export const $cart = createStore<ICart>({
  id: '',
  name: '',
  isDefault: true,
  items: [],
  total: 0,
});

export const $isCartPending = createStore(false);
export const $isRemoving = createStore(false);

sample({
  clock: [pageMounted, createCartFx.done, selectAsDefaultFx.done],
  target: fetchCartsFx,
});

$isCartPending.on(fetchCartsFx, () => true);

$carts.on(fetchCartsFx.doneData, (_, { list }) => list);

fetchCartsFx.failData.watch((e) => toast.error(e.message));

$isCartPending.on(fetchCartsFx.finally, () => false);

//
sample({
  clock: fetchCartsFx.doneData,
  source: { isAuthenticated: $isAuthenticated },
  filter: (_, { list }) => list.find((c) => c.isDefault) !== undefined,
  fn: ({ isAuthenticated }, { list }) => {
    const defaultCart = list.find((c) => c.isDefault);
    return { isAuthenticated, cartId: defaultCart ? defaultCart.id : '' };
  },
  target: fetchCartFx,
});

sample({
  clock: loadCart,
  source: { isAuthenticated: $isAuthenticated },
  fn: ({ isAuthenticated }, cartId) => {
    return { isAuthenticated, cartId };
  },
  target: fetchCartFx,
});

$isCartPending.on(fetchCartFx, () => true);

$cart.on(fetchCartFx.doneData, (_, cart) => cart);

fetchCartFx.failData.watch((e) => toast.error(e.message));

$isCartPending.on(fetchCartFx.finally, () => false);

sample({
  clock: cartDeleted,
  source: { cart: $cart },
  fn: ({ cart }) => cart.id,
  target: deleteCartFx,
});

deleteCartFx.failData.watch((e) => toast.error(e.message));

sample({
  clock: deleteCartFx.done,
  source: { cart: $cart },
  fn: ({ cart }) => cart.id,
  target: fetchCartsFx,
});

//
sample({
  clock: removeFromCart,
  source: { isAuthenticated: $isAuthenticated },
  fn: ({ isAuthenticated }, cartItemId) => ({ isAuthenticated, cartItemId }),
  target: removeFromCartFx,
});

$isRemoving.on(removeFromCartFx, () => true);

removeFromCartFx.failData.watch((e) => toast.error(e.message));

$isRemoving.on(removeFromCartFx.finally, () => false);

sample({
  clock: removeFromCartFx.done,
  source: { cart: $cart, isAuthenticated: $isAuthenticated },
  fn: ({ isAuthenticated, cart }) => ({ isAuthenticated, cartId: cart.id }),
  target: fetchCartFx,
});

// Events
export const newCartFormSubmitted = createEvent<string>(
  'New cart form submitted',
);

// Stores
export const $isNewCartCreating = createStore(false);

sample({
  clock: newCartFormSubmitted,
  target: createCartFx,
});

$isNewCartCreating.on(createCartFx, () => true);

createCartFx.failData.watch((e) => toast.error(e.message));

$isNewCartCreating.on(createCartFx.finally, () => false);

sample({
  clock: createCartFx.done,
  target: fetchCartsFx,
});

//
sample({
  clock: selectedAsDefault,
  source: { cart: $cart },
  fn: ({ cart }) => cart.id,
  target: selectAsDefaultFx,
});

selectAsDefaultFx.failData.watch((e) => toast.error(e.message));

sample({
  clock: selectAsDefaultFx.done,
  target: fetchCartsFx,
});
