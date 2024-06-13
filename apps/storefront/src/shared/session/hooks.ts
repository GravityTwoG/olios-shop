import { useUnit } from 'effector-react';

import {
  $authStatus,
  $user,
  AuthStatus,
  SessionUser,
  SessionUserRole,
} from './session';

export const useUser = (): SessionUser => {
  return useUnit($user);
};

export const useUserRole = (): SessionUserRole => {
  return useUser().role;
};

export const useAuthStatus = (): AuthStatus => {
  return useUnit($authStatus);
};
