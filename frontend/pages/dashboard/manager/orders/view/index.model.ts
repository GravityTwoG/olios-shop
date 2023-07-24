import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';
import * as ordersApi from '@/src/shared/api/orders';
import { IOrder, OrderStatus } from '@/src/types/IOrder';

// Effects
const fetchOrderFx = createEffect<string, IOrder, ApiError>((orderId) => {
  return ordersApi.fetchOrder(orderId);
});

const markAsDeliveredFx = createEffect<string, IOrder, ApiError>((orderId) => {
  return ordersApi.markAsDelivered(orderId);
});

// Events
export const pageMounted = createEvent<string>('Manage Order');
export const delivered = createEvent('Delivered');

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
export const $isMarking = createStore(false);

reset({
  clock: pageMounted,
  target: [$order, $isOrderPending],
});

sample({
  clock: [pageMounted],
  target: fetchOrderFx,
});

$isOrderPending.on(fetchOrderFx, () => true);

$order.on(fetchOrderFx.doneData, (_, order) => order);

fetchOrderFx.failData.watch((e) => toast.error(e.message));

$isOrderPending.on(fetchOrderFx.finally, () => false);

sample({
  clock: delivered,
  source: { order: $order },
  fn: ({ order }) => order.id,
  target: markAsDeliveredFx,
});

$isMarking.on(markAsDeliveredFx, () => true);

markAsDeliveredFx.failData.watch((e) => toast.error(e.message));

$isMarking.on(markAsDeliveredFx.finally, () => false);

$order.on(markAsDeliveredFx.doneData, (_, order) => order);
