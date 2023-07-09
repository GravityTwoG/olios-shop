import { createStore, attach } from 'effector';

import { IUser, IUserRole } from '@/src/types/IUser';
import * as authApi from '@/src/shared/api/auth';

export const fetchSessionFx = attach({ effect: authApi.fetchSessionFx });

export const logoutFx = attach({ effect: authApi.logoutFx });

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

export const $user = createStore<IUser>(defaultUser);
export const $authStatus = createStore<AuthStatus>(AuthStatus.Initial);

$authStatus.on(fetchSessionFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(fetchSessionFx.doneData, (_, user) => user);
$authStatus.on(fetchSessionFx.doneData, () => AuthStatus.Authenticated);

$user.on(fetchSessionFx.fail, () => defaultUser);
$authStatus.on(fetchSessionFx.fail, () => AuthStatus.Anonymous);

$authStatus.on(logoutFx.done, () => AuthStatus.Anonymous);
$authStatus.on(logoutFx.failData, (_, error) => {
  AuthStatus.Anonymous;
  console.log(error);
});
