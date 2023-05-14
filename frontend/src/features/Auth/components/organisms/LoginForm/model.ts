import * as authApi from '@/src/shared/api/auth';
import { fetchSessionFx } from '@/src/shared/session';
import { attach, createEvent, createStore, sample } from 'effector';

const loginFx = attach({ effect: authApi.loginFx });

export const $isLoading = createStore(false);
export const $loginError = createStore('');

export const setLoginError = createEvent<string>('set loginError');
export const formSubmitted = createEvent<authApi.ILoginCredentials>(
  'Login form submitted',
);

$loginError.on(setLoginError, (_, payload) => payload);

sample({ clock: formSubmitted, target: loginFx });

$isLoading.on(loginFx, () => true);
$loginError.on(loginFx, () => '');
$loginError.on(loginFx.failData, (_, error) => error.message);
$isLoading.on(loginFx.finally, () => false);

sample({
  clock: loginFx.done,
  target: fetchSessionFx,
});
