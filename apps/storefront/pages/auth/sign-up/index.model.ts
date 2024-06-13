import { createEffect, createEvent, createStore, sample } from 'effector';
import { combineEvents, not } from 'patronum';

import * as authApi from '@olios-shop/storefront/shared/api/auth';
import { addFromAnonymousCart } from '@olios-shop/storefront/shared/api/cart';
import { loginFx } from '@olios-shop/storefront/shared/auth';
import { toast } from '@olios-shop/storefront/shared/toasts';

// Effects
const registerFx = createEffect(
  async (credentials: authApi.IRegisterCredentials) => {
    await authApi.register(credentials);

    return credentials;
  },
);

const addFromAnonymousCartFx = createEffect(() => addFromAnonymousCart());

// Events
export const formSubmitted = createEvent<authApi.IRegisterCredentials>(
  'Register form submitted',
);

// Stores
export const $error = createStore('');
export const $isPending = createStore(false);

sample({
  clock: formSubmitted,
  filter: not($isPending),
  target: registerFx,
});

$error.on(registerFx, () => '');

$isPending.on(registerFx, () => true);

$isPending.on(registerFx.finally, () => false);

$error.on(registerFx.failData, (_, err) => err.message);

sample({
  clock: registerFx.doneData,
  target: loginFx,
});

sample({
  clock: combineEvents({
    events: {
      registered: registerFx.done,
      loggedIn: loginFx.done,
    },
  }),
  target: addFromAnonymousCartFx,
});

addFromAnonymousCartFx.failData.watch((err) =>
  toast.error(`Error when uploading cart items: ${err.message}`),
);
