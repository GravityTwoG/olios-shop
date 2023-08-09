import { createEffect, createEvent, createStore, sample } from 'effector';

import { IUser } from '@/src/types/IUser';
import { ApiError } from '@/src/shared/api';
import * as authApi from '@/src/shared/api/auth';
import { loginFx } from '@/src/shared/auth';

// Effects
const registerFx = createEffect<authApi.IRegisterCredentials, IUser, ApiError>(
  (credentials) => authApi.register(credentials),
);

// Events
export const emailChanged = createEvent<string>('Email changed');
export const passwordChanged = createEvent<string>('Password changed');
export const formSubmitted = createEvent('Register form submitted');

// Stores
export const $email = createStore('');
export const $password = createStore('');
export const $error = createStore('');
export const $isPending = createStore(false);

$email.on(emailChanged, (_, value) => value);
$password.on(passwordChanged, (_, value) => value);

sample({
  clock: formSubmitted,
  source: {
    email: $email,
    password: $password,
  },
  target: registerFx,
});

$error.on(registerFx, () => '');

$isPending.on(registerFx, () => true);

$isPending.on(registerFx.finally, () => false);

$error.on(registerFx.failData, (_, err) => err.message);

sample({
  clock: registerFx.done,
  source: {
    email: $email,
    password: $password,
  },
  target: loginFx,
});
