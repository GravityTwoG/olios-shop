import { createEffect, createEvent, createStore, sample } from 'effector';

import { ICart } from '@/src/types/ICart';
import { toast } from '@/src/shared/toasts';
import * as cartApi from '@/src/shared/api/cart';

// Effects
const createCartFx = createEffect<string, ICart>((name) => {
  return cartApi.createCart(name);
});

const fetchCartsFx = createEffect(() => {
  return cartApi.fetchCarts();
});

const fetchCartFx = createEffect<string, ICart>((cartId) => {
  return cartApi.fetchCartById(cartId);
});

const selectAsDefaultFx = createEffect<string, ICart>(async (cartId) => {
  return cartApi.selectAsDefault(cartId);
});

const deleteCartFx = createEffect<string, void>((cartId) => {
  return cartApi.deleteCart(cartId);
});

const removeFromCartFx = createEffect<string, void>((cartItemId) => {
  return cartApi.removeFromCart(cartItemId);
});

// Events
export const pageMounted = createEvent('Cart page mounted');
export const loadCart = createEvent<string>('Load cart');
export const selectedAsDefault = createEvent('Selected as default');
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
  filter: ({ list }) => list.find((c) => c.isDefault) !== undefined,
  fn: ({ list }) => {
    const defaultCart = list.find((c) => c.isDefault);
    return defaultCart ? defaultCart.id : '';
  },
  target: fetchCartFx,
});

sample({
  clock: loadCart,
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
  target: removeFromCartFx,
});

$isRemoving.on(removeFromCartFx, () => true);

removeFromCartFx.failData.watch((e) => toast.error(e.message));

$isRemoving.on(removeFromCartFx.finally, () => false);

sample({
  clock: removeFromCartFx.done,
  source: { cart: $cart },
  fn: ({ cart }) => cart.id,
  target: fetchCartFx,
});

//

// Events
export const newCartNameChanged = createEvent<string>('New cart name changed');
export const newCartFormSubmitted = createEvent('New cart form submitted');

// Stores
export const $newCartName = createStore('');

$newCartName.on(newCartNameChanged, (_, value) => value);

sample({
  clock: newCartFormSubmitted,
  source: { name: $newCartName },
  filter: ({ name }) => name.length > 0,
  fn: ({ name }) => name,
  target: createCartFx,
});

$newCartName.on(createCartFx.done, () => '');

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
