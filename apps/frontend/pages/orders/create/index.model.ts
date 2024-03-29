import { createEffect, createEvent, createStore, sample } from 'effector';

import { ICart } from '@/src/types/ICart';
import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';
import * as cartApi from '@/src/shared/api/cart/cart';
import * as ordersApi from '@/src/shared/api/orders';
import { IOrder } from '@/src/types/IOrder';

// Effects
const fetchCartFx = createEffect<string, ICart, ApiError>((cartId) => {
  return cartApi.fetchCartById({ isAuthenticated: true, cartId });
});

// Events
export const pageMounted = createEvent<string>('Create order page mounted');

// Stores
export const $cart = createStore<ICart>({
  id: '',
  name: '',
  isDefault: true,
  items: [],
  total: 0,
});

export const $isCartPending = createStore(false);

sample({
  clock: [pageMounted],
  target: fetchCartFx,
});

$isCartPending.on(fetchCartFx, () => true);

$cart.on(fetchCartFx.doneData, (_, cart) => cart);

fetchCartFx.failData.watch((e) => toast.error(e.message));

$isCartPending.on(fetchCartFx.finally, () => false);

//
const createOrderFx = createEffect<ordersApi.CreateOrderDTO, IOrder, ApiError>(
  (dto) => {
    return ordersApi.createOrder(dto);
  },
);

export const formSubmitted = createEvent<ordersApi.CreateOrderDTO>('');
export const orderCreated = createOrderFx.doneData;

export const $isCreating = createStore(false);

sample({
  clock: formSubmitted,
  fn: (data) => ({
    cartId: data.cartId,

    country: data.country,
    city: data.city,
    street: data.street,
    house: data.house,
    flat: data.flat,
    floor: data.floor,

    name: data.name,
    phoneNumber: data.phoneNumber,
  }),
  target: createOrderFx,
});

$isCreating.on(createOrderFx, () => true);

createOrderFx.failData.watch((e) => toast.error(e.message));

$isCreating.on(createOrderFx.finally, () => false);
