import { createStore, createEffect, createEvent, sample } from 'effector';

import { IUser, IUserRole } from '@olios-shop/frontend/types/IUser';

import * as authApi from '../api/auth';
import { ApiError } from '../api';
import { toast } from '../toasts';

export enum SessionUserRole {
  ANONYMOUS = 'ANONYMOUS',
  CUSTOMER = IUserRole.CUSTOMER,
  CONTENT_MANAGER = IUserRole.CONTENT_MANAGER,
  MANAGER = IUserRole.MANAGER,
}

export type SessionUser = Omit<IUser, 'role'> & {
  role: SessionUserRole;
};

const defaultUser: SessionUser = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  patronymic: '',
  role: SessionUserRole.ANONYMOUS,
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
export const sessionChecked = fetchSessionFx.finally;
export const logout = createEvent('Logout');

// Stores
export const $user = createStore(defaultUser);
export const $authStatus = createStore(AuthStatus.Initial);

export const $isAuthenticated = $authStatus.map(
  (state) => state === AuthStatus.Authenticated,
);

export const $isSessionChecked = $authStatus.map(
  (state) =>
    state === AuthStatus.Authenticated || state === AuthStatus.Anonymous,
);

sample({
  clock: appStarted,
  target: fetchSessionFx,
});

$authStatus.on(fetchSessionFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

// fetch session
$user.on(fetchSessionFx.doneData, (_, user) => ({
  ...user,
  role: mapToSessionUserRole(user.role),
}));
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
$user.on(logoutFx.done, () => defaultUser);

$authStatus.on(logoutFx.fail, () => AuthStatus.Authenticated);

logoutFx.failData.watch((error) => {
  toast.error(error.message);
});

// Utils
function mapToSessionUserRole(role: IUserRole): SessionUserRole {
  if (role === IUserRole.CUSTOMER) {
    return SessionUserRole.CUSTOMER;
  }
  if (role === IUserRole.CONTENT_MANAGER) {
    return SessionUserRole.CONTENT_MANAGER;
  }
  if (role === IUserRole.MANAGER) {
    return SessionUserRole.MANAGER;
  }

  return SessionUserRole.ANONYMOUS;
}
