import { createEvent, createStore, sample } from 'effector';

import * as ordersApi from '@olios-shop/admin/shared/api/orders';
import { IOrder } from '@olios-shop/admin/types/IOrder';
import { ListDTO } from '@olios-shop/admin/shared/api/lib';
import { toast } from '@olios-shop/admin/shared/toasts';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

// Effects
const fetchOrdersFx = createAPIEffect<
  { pageSize: number; pageNumber: number },
  ListDTO<IOrder> & { pageNumber: number }
>(async ({ pageSize, pageNumber }) => {
  const result = await ordersApi.fetchOrders({
    take: pageSize,
    skip: pageNumber * pageSize,
  });

  return {
    ...result,
    pageNumber,
  };
});

// Events
export const pageMounted = createEvent();
export const loadPage = createEvent<number>();

// Stores
export const $orders = createStore<IOrder[]>([]);
export const $ordersCount = createStore(0);

export const $pageSize = createStore(12);
export const $pageNumber = createStore(0);
export const $isPending = fetchOrdersFx.$isPending;

sample({
  clock: pageMounted,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
  },
  target: fetchOrdersFx.call,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
  },
  fn: ({ pageSize }, pageNumber) => ({ pageSize, pageNumber }),
  target: fetchOrdersFx.call,
});

$orders.on(fetchOrdersFx.call.doneData, (_, { list }) => list);
$ordersCount.on(fetchOrdersFx.call.doneData, (_, { count }) => count);
$pageNumber.on(fetchOrdersFx.call.doneData, (_, { pageNumber }) => pageNumber);

fetchOrdersFx.call.failData.watch((e) => toast.error(e.message));
