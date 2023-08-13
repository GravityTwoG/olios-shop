import { createEffect, createEvent, createStore, sample } from 'effector';
import { every } from 'patronum';

import { ICart } from '@/src/types/ICart';
import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';
import * as cartApi from '@/src/shared/api/cart/cart';
import * as ordersApi from '@/src/shared/api/orders';
import { createField } from '@/src/shared/effector';
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

export const formSubmitted = createEvent('');
export const orderCreated = createOrderFx.doneData;

export const [$country, countryChanged] = createField('Country', '');
export const [$city, cityChanged] = createField('City', '');
export const [$street, streetChanged] = createField('Street', '');
export const [$house, houseChanged] = createField('House', '');
export const [$flat, flatChanged] = createField('Flat', '');
export const [$floor, floorChanged] = createField('Floor', 0);
export const [$phoneNumber, phoneNumberChanged] = createField(
  'Phone Number',
  '',
);
export const [$name, nameChanged] = createField('Name', '');

export const $isCreating = createStore(false);

const $isFormValid = every({
  stores: [$country, $city, $street, $house, $flat, $name, $phoneNumber],
  predicate: (store) => store.length > 0,
});

sample({
  clock: formSubmitted,
  source: {
    cart: $cart,
    country: $country,
    city: $city,
    street: $street,
    house: $house,
    flat: $flat,
    floor: $floor,
    name: $name,
    phoneNumber: $phoneNumber,
  },
  fn: (data) => ({
    cartId: data.cart.id,

    country: data.country,
    city: data.city,
    street: data.street,
    house: data.house,
    flat: data.flat,
    floor: data.floor,

    name: data.name,
    phoneNumber: data.phoneNumber,
  }),
  filter: $isFormValid,
  target: createOrderFx,
});

$isCreating.on(createOrderFx, () => true);

createOrderFx.failData.watch((e) => toast.error(e.message));

$isCreating.on(createOrderFx.finally, () => false);
