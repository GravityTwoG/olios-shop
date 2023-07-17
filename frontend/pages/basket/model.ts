import { createEffect, createEvent, createStore, sample } from 'effector';

import { ICart, ICartItem } from '@/src/types/ICart';
import { toast } from '@/src/shared/toasts';
import * as cartApi from '@/src/shared/api/cart';

// Effects
const fetchCartFx = createEffect(() => {
  return cartApi.fetchCart();
});

const removeFromCartFx = createEffect<string, ICartItem>(async (cartItemId) => {
  return cartApi.removeFromCart(cartItemId);
});

// Events
export const pageMounted = createEvent('Cart page mounted');
export const removeFromCart = createEvent<string>('Remove from cart');

// Stores
export const $cart = createStore<ICart>({
  id: '',
  items: [],
  total: 0,
});

export const $isCartPending = createStore(false);
export const $isRemoving = createStore(false);

sample({
  clock: [pageMounted, removeFromCartFx.done],
  target: fetchCartFx,
});

$isCartPending.on(fetchCartFx, () => true);

$cart.on(fetchCartFx.doneData, (_, cart) => cart);

fetchCartFx.failData.watch((e) => toast.error(e.message));

$isCartPending.on(fetchCartFx.finally, () => false);

sample({
  clock: removeFromCart,
  target: removeFromCartFx,
});

$isRemoving.on(removeFromCartFx, () => true);

removeFromCartFx.failData.watch((e) => toast.error(e.message));

$isRemoving.on(removeFromCartFx.finally, () => false);
