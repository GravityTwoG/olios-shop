import { createEffect, createEvent, createStore, sample } from 'effector';

import * as ordersApi from '@/src/shared/api/orders';
import { IOrder } from '@/src/types/IOrder';
import { ListDTO } from '@/src/shared/api/lib';
import { toast } from '@/src/shared/toasts';

// Effects
const fetchOrdersFx = createEffect<
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
export const $isPending = createStore(false);

sample({
  clock: pageMounted,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
  },
  target: fetchOrdersFx,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
  },
  fn: ({ pageSize }, pageNumber) => ({ pageSize, pageNumber }),
  target: fetchOrdersFx,
});

$isPending.on(fetchOrdersFx, () => true);

$orders.on(fetchOrdersFx.doneData, (_, { list }) => list);
$ordersCount.on(fetchOrdersFx.doneData, (_, { count }) => count);
$pageNumber.on(fetchOrdersFx.doneData, (_, { pageNumber }) => pageNumber);

fetchOrdersFx.failData.watch((e) => toast.error(e.message));

$isPending.on(fetchOrdersFx.finally, () => false);
