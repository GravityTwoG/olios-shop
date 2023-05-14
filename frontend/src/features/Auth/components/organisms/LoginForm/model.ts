import * as authApi from '@/src/shared/api/auth';
import { fetchSessionFx } from '@/src/shared/session';
import { attach, createEvent, createStore, sample } from 'effector';

const loginFx = attach({ effect: authApi.loginFx });

export const $loginError = createStore('');

export const setLoginError = createEvent<string>('set loginError');
export const formSubmitted = createEvent<authApi.ILoginCredentials>(
  'Login form submitted',
);

$loginError.on(setLoginError, (_, payload) => payload);

sample({ clock: formSubmitted, target: loginFx });

sample({
  clock: loginFx.done,
  target: fetchSessionFx,
});

loginFx.done.watch(() => {
  setLoginError('');
});

loginFx.fail.watch(({ error }) => {
  setLoginError(error.message);
});
