import { useStore } from 'effector-react';

import { $authStatus, $user, AuthStatus } from '.';
import { IUser, IUserRole } from '@/src/types/IUser';

export const useUser = (): IUser => {
  return useStore($user);
};

export const useUserRole = (): IUserRole => {
  return useUser().role;
};

export const useAuthStatus = (): AuthStatus => {
  return useStore($authStatus);
};
