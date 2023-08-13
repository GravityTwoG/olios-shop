import { useStore } from 'effector-react';

import {
  $authStatus,
  $user,
  AuthStatus,
  SessionUser,
  SessionUserRole,
} from './session';

export const useUser = (): SessionUser => {
  return useStore($user);
};

export const useUserRole = (): SessionUserRole => {
  return useUser().role;
};

export const useAuthStatus = (): AuthStatus => {
  return useStore($authStatus);
};
