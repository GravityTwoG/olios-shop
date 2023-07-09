import { attach, createEvent, createStore, sample } from 'effector';

import * as authApi from '@/src/shared/api/auth';
import { fetchSessionFx } from '@/src/shared/session';

const registerEmployeeFx = attach({ effect: authApi.registerEmployeeFx });

export const $email = createStore('');
export const $password = createStore('');
export const $inviteCode = createStore('');
export const $error = createStore('');
export const $isPending = createStore(false);

export const emailChanged = createEvent<string>('Email changed');
export const passwordChanged = createEvent<string>('Password changed');
export const inviteCodeChanged = createEvent<string>('Invite code changed');
export const formSubmitted = createEvent('Register form submitted');

$email.on(emailChanged, (_, value) => value);
$password.on(passwordChanged, (_, value) => value);
$inviteCode.on(inviteCodeChanged, (_, value) => value);

sample({
  source: {
    email: $email,
    password: $password,
    inviteCode: $inviteCode,
  },
  clock: formSubmitted,
  target: registerEmployeeFx,
});

$error.on(registerEmployeeFx, () => '');

$isPending.on(registerEmployeeFx, () => true);

$isPending.on(registerEmployeeFx.finally, () => false);

$error.on(registerEmployeeFx.failData, (_, err) => err.message);

sample({
  source: {
    email: $email,
    password: $password,
  },
  clock: registerEmployeeFx.done,
  target: authApi.loginFx,
});

sample({
  clock: authApi.loginFx.done,
  target: fetchSessionFx,
});
