import { attach, createEvent, createStore, sample } from 'effector';

import * as authApi from '@/src/shared/api/auth';
import { fetchSessionFx } from '@/src/shared/session';

const registerFx = attach({ effect: authApi.registerFx });

export const $email = createStore('');
export const $password = createStore('');
export const $error = createStore('');
export const $isPending = createStore(false);

export const emailChanged = createEvent<string>('Email changed');
export const passwordChanged = createEvent<string>('Password changed');
export const formSubmitted = createEvent('Register form submitted');

$email.on(emailChanged, (_, value) => value);
$password.on(passwordChanged, (_, value) => value);

sample({
  source: {
    email: $email,
    password: $password,
  },
  clock: formSubmitted,
  target: registerFx,
});

$error.on(registerFx, () => '');

$isPending.on(registerFx, () => true);

$isPending.on(registerFx.finally, () => false);

$error.on(registerFx.failData, (_, err) => err.message);

sample({
  source: {
    email: $email,
    password: $password,
  },
  clock: registerFx.done,
  target: authApi.loginFx,
});

sample({
  clock: authApi.loginFx.done,
  target: fetchSessionFx,
});
