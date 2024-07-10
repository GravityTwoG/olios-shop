import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { toast } from '@olios-shop/storefront/shared/toasts';
import { ApiError } from '@olios-shop/storefront/shared/api';
import * as ordersApi from '@olios-shop/storefront/shared/api/orders';
import { IOrder, OrderStatus } from '@olios-shop/storefront/types/IOrder';

// Effects
const fetchOrderFx = createEffect<string, IOrder, ApiError>((orderId) => {
  return ordersApi.fetchCustomersOrder(orderId);
});

// Events
export const pageMounted = createEvent<string>('Payment page mounted');

// Stores
export const $order = createStore<IOrder>({
  id: '',
  status: OrderStatus.CREATED,
  country: '',
  city: '',
  street: '',
  house: '',
  flat: '',
  floor: 0,
  name: '',
  phoneNumber: '',
  items: [],
  total: 0,
});

export const $isOrderPending = createStore(false);

reset({
  clock: pageMounted,
  target: [$order, $isOrderPending],
});

sample({
  clock: pageMounted,
  target: fetchOrderFx,
});

$isOrderPending.on(fetchOrderFx, () => true);

$order.on(fetchOrderFx.doneData, (_, order) => order);

fetchOrderFx.failData.watch((e) => toast.error(e.message));

$isOrderPending.on(fetchOrderFx.finally, () => false);
