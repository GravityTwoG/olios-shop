import { createEvent, createStore, sample } from 'effector';
import { and, every, not } from 'patronum';

import { loginFx } from '@/src/shared/auth';

// Events
export const emailChanged = createEvent<string>('Email changed');
export const passwordChanged = createEvent<string>('Password changed');
export const setLoginError = createEvent<string>('set loginError');
export const formSubmitted = createEvent('Login form submitted');

// Stores
export const $email = createStore('');
export const $emailError = createStore<null | 'empty' | 'invalid'>(null);

export const $password = createStore('');
export const $passwordError = createStore<null | 'empty' | 'invalid'>(null);

export const $isLoginPending = createStore(false);
export const $loginError = createStore('');

const $isFormValid = every({
  stores: [$emailError, $passwordError],
  predicate: null,
});

$email.on(emailChanged, (_, payload) => payload);
$password.on(passwordChanged, (_, payload) => payload);
$loginError.on(setLoginError, (_, payload) => payload);
$loginError.reset(formSubmitted);

sample({
  clock: formSubmitted,
  source: $email,
  fn: (email) => {
    if (email.trim().length === 0) return 'empty';
    if (!email.includes('@')) return 'invalid';
    return null;
  },
  target: $emailError,
});

sample({
  clock: formSubmitted,
  source: $password,
  fn: (password) => {
    if (password.trim().length === 0) return 'empty';
    return null;
  },
  target: $passwordError,
});

sample({
  clock: formSubmitted,
  source: { email: $email, password: $password },
  filter: and($isFormValid, not($isLoginPending)),
  target: loginFx,
});

$isLoginPending.on(loginFx, () => true);

$loginError.on(loginFx.failData, (_, error) => error.message);

$isLoginPending.on(loginFx.finally, () => false);
