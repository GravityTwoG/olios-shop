import { createEvent, sample } from 'effector';

import * as authApi from '@olios-shop/admin/shared/api/auth';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';
import { loginFx } from '@olios-shop/admin/shared/auth';

// Effects
const registerEmployeeFx = createAPIEffect(
  async (credentials: authApi.IRegisterEmployeeCredentials) => {
    await authApi.registerEmployee(credentials);

    return credentials;
  },
  (err) => err.message,
);

// Events
export const formSubmitted = createEvent<authApi.IRegisterEmployeeCredentials>(
  'Register form submitted',
);

// Stores
export const $error = registerEmployeeFx.$error;
export const $isPending = registerEmployeeFx.$isPending;

sample({
  clock: formSubmitted,
  target: registerEmployeeFx.call,
});

sample({
  clock: registerEmployeeFx.call.doneData,
  target: loginFx,
});
