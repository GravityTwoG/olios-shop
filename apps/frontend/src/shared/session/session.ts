import { createStore, createEffect, createEvent, sample } from 'effector';

import { IUser, IUserRole } from '@/src/types/IUser';
import { ApiError } from '../api';
import * as authApi from '@/src/shared/api/auth';

const defaultUser: IUser = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  patronymic: '',
  role: IUserRole.CUSTOMER,
  birthDate: '',
  isActive: true,
};

export enum AuthStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Anonymous = 'Anonymous',
  Authenticated = 'Authenticated',
}

// Effects
export const fetchSessionFx = createEffect<void, IUser, ApiError>(() => {
  return authApi.fetchSession();
});

const logoutFx = createEffect<void, void, ApiError>(() => authApi.logout());

// Events
export const appStarted = createEvent('App started');
export const sessionAcquired = fetchSessionFx.done;
export const sessionChecked = fetchSessionFx.finally;
export const logout = createEvent('Logout');

// Stores
export const $user = createStore<IUser>(defaultUser);
export const $authStatus = createStore<AuthStatus>(AuthStatus.Initial);

sample({
  clock: appStarted,
  target: fetchSessionFx,
});

$authStatus.on(fetchSessionFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

// fetch session
$user.on(fetchSessionFx.doneData, (_, user) => user);
$authStatus.on(fetchSessionFx.doneData, () => AuthStatus.Authenticated);

$user.on(fetchSessionFx.fail, () => defaultUser);
$authStatus.on(fetchSessionFx.fail, () => AuthStatus.Anonymous);

fetchSessionFx.failData.watch((error) => {
  console.error(error);
});

// logout
sample({ clock: logout, target: logoutFx });

$authStatus.on(logoutFx, () => AuthStatus.Pending);
$authStatus.on(logoutFx.done, () => AuthStatus.Anonymous);

logoutFx.failData.watch((error) => {
  console.error(error);
});
