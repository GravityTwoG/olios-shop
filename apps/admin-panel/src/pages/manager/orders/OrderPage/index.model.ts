import { createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { toast } from '@olios-shop/admin/shared/toasts';
import * as ordersApi from '@olios-shop/admin/shared/api/orders';
import { IOrder, OrderStatus } from '@olios-shop/admin/types/IOrder';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

// Effects
const fetchOrderFx = createAPIEffect<string, IOrder>((orderId) => {
  return ordersApi.fetchOrder(orderId);
});

const markAsDeliveredFx = createAPIEffect<string, IOrder>((orderId) => {
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

export const $isOrderPending = fetchOrderFx.$isPending;
export const $isMarking = markAsDeliveredFx.$isPending;

reset({
  clock: pageMounted,
  target: [$order, $isOrderPending],
});

sample({
  clock: [pageMounted],
  target: fetchOrderFx.call,
});

$order.on(fetchOrderFx.call.doneData, (_, order) => order);

fetchOrderFx.call.failData.watch((e) => toast.error(e.message));

sample({
  clock: delivered,
  source: { order: $order },
  fn: ({ order }) => order.id,
  target: markAsDeliveredFx.call,
});

markAsDeliveredFx.call.failData.watch((e) => toast.error(e.message));

$order.on(markAsDeliveredFx.call.doneData, (_, order) => order);
