import { attach, createEvent, createStore, sample } from 'effector';

import * as authApi from '@/src/shared/api/auth';

const registerFx = attach({ effect: authApi.registerFx });

export const $registerError = createStore('');

export const setRegisterError = createEvent<string>('set registerError');
export const formSubmitted = createEvent<authApi.IRegisterCredentials>(
  'Register form submitted',
);

$registerError.on(setRegisterError, (_, payload) => payload);

sample({ clock: formSubmitted, target: registerFx });

registerFx.done.watch(() => {
  setRegisterError('');
});

registerFx.fail.watch(({ error }) => {
  setRegisterError(error.message);
});
