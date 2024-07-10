import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';

import { loginFx } from '@olios-shop/storefront/shared/auth';

// Events
export const setLoginError = createEvent<string>('set loginError');
export const formSubmitted = createEvent<{ email: string; password: string }>(
  'Login form submitted',
);

// Stores
export const $isLoginPending = createStore(false);
export const $loginError = createStore('');

$loginError.on(setLoginError, (_, payload) => payload);
$loginError.reset(formSubmitted);

sample({
  clock: formSubmitted,
  filter: not($isLoginPending),
  target: loginFx,
});

$isLoginPending.on(loginFx, () => true);

$loginError.on(loginFx.failData, (_, error) => error.message);

$isLoginPending.on(loginFx.finally, () => false);
