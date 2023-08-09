import { createEffect, createEvent, createStore, sample } from 'effector';
import { every } from 'patronum';

import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';
import * as ordersApi from '@/src/shared/api/orders';
import { createField } from '@/src/shared/effector';
import { IOrder, OrderStatus } from '@/src/types/IOrder';

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

sample({
  clock: pageMounted,
  target: fetchOrderFx,
});

$isOrderPending.on(fetchOrderFx, () => true);

$order.on(fetchOrderFx.doneData, (_, order) => order);

fetchOrderFx.failData.watch((e) => toast.error(e.message));

$isOrderPending.on(fetchOrderFx.finally, () => false);

//
const makePaymentFx = createEffect<ordersApi.MakePaymentDTO, IOrder, ApiError>(
  (dto) => {
    return ordersApi.makePayment(dto);
  },
);

export const formSubmitted = createEvent('');

export const [$cardNumber, countryChanged] = createField('Card Number', '');
export const [$cardDate, cityChanged] = createField('Card Date', '');
export const [$cardCVC, streetChanged] = createField('Card CVC', '');
export const [$cardHolder, houseChanged] = createField('Card Holder', '');

export const $isPaymentPending = createStore(false);

const $isFormValid = every({
  stores: [$cardNumber, $cardDate, $cardCVC, $cardHolder],
  predicate: (store) => store.length > 0,
});

sample({
  clock: formSubmitted,
  source: {
    order: $order,
    cardNumber: $cardNumber,
    cardDate: $cardDate,
    cardCVC: $cardCVC,
    cardHolder: $cardHolder,
  },
  fn: (data) => ({
    orderId: data.order.id,

    cardNumber: data.cardNumber,
    cardDate: data.cardDate,
    cardCVC: data.cardCVC,
    cardHolder: data.cardHolder,
  }),
  filter: $isFormValid,
  target: makePaymentFx,
});

$isPaymentPending.on(makePaymentFx, () => true);

makePaymentFx.failData.watch((e) => toast.error(e.message));

$isPaymentPending.on(makePaymentFx.finally, () => false);
