import { createEffect, createEvent, createStore, sample } from 'effector';

import * as authApi from '@/src/shared/api/auth';
import { loginFx } from '@/src/shared/auth';
import { IUser } from '@/src/types/IUser';
import { ApiError } from '@/src/shared/api';

// Effects
const registerEmployeeFx = createEffect<
  authApi.IRegisterEmployeeCredentials,
  IUser,
  ApiError
>((credentials) => authApi.registerEmployee(credentials));

// Events
export const emailChanged = createEvent<string>('Email changed');
export const passwordChanged = createEvent<string>('Password changed');
export const inviteCodeChanged = createEvent<string>('Invite code changed');
export const formSubmitted = createEvent('Register form submitted');

// Stores
export const $email = createStore('');
export const $password = createStore('');
export const $inviteCode = createStore('');
export const $error = createStore('');
export const $isPending = createStore(false);

$email.on(emailChanged, (_, value) => value);
$password.on(passwordChanged, (_, value) => value);
$inviteCode.on(inviteCodeChanged, (_, value) => value);

sample({
  clock: formSubmitted,
  source: {
    email: $email,
    password: $password,
    inviteCode: $inviteCode,
  },
  target: registerEmployeeFx,
});

$error.on(registerEmployeeFx, () => '');

$isPending.on(registerEmployeeFx, () => true);

$isPending.on(registerEmployeeFx.finally, () => false);

$error.on(registerEmployeeFx.failData, (_, err) => err.message);

sample({
  clock: registerEmployeeFx.done,
  source: {
    email: $email,
    password: $password,
  },
  target: loginFx,
});
