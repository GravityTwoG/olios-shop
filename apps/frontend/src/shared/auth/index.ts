import { createEffect, sample } from 'effector';

import * as authApi from '@olios-shop/frontend/shared/api/auth';
import { IUser } from '@olios-shop/frontend/types/IUser';
import { ApiError } from '../api';
import { fetchSessionFx } from '../session';

// Effects
export const loginFx = createEffect<authApi.ILoginCredentials, IUser, ApiError>(
  (credentials) => authApi.login(credentials),
);

sample({
  clock: loginFx.done,
  target: fetchSessionFx,
});
