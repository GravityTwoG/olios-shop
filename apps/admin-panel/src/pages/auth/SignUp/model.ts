import { createEffect, createEvent, createStore, sample } from 'effector';

import * as authApi from '@olios-shop/admin/shared/api/auth';
import { loginFx } from '@olios-shop/admin/shared/auth';

// Effects
const registerEmployeeFx = createEffect(
  async (credentials: authApi.IRegisterEmployeeCredentials) => {
    await authApi.registerEmployee(credentials);

    return credentials;
  },
);

// Events
export const formSubmitted = createEvent<authApi.IRegisterEmployeeCredentials>(
  'Register form submitted',
);

// Stores
export const $error = createStore('');
export const $isPending = createStore(false);

sample({
  clock: formSubmitted,
  target: registerEmployeeFx,
});

$error.on(registerEmployeeFx, () => '');

$isPending.on(registerEmployeeFx, () => true);

$isPending.on(registerEmployeeFx.finally, () => false);

$error.on(registerEmployeeFx.failData, (_, err) => err.message);

sample({
  clock: registerEmployeeFx.doneData,
  target: loginFx,
});
