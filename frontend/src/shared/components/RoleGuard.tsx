import { ReactNode } from 'react';

import { IUserRole } from '@/src/types/IUser';

import { AuthStatus, useAuthStatus, useUserRole } from '../session';

export type RoleGuardProps = {
  roles: IUserRole | IUserRole[];
  children?: ReactNode;
};

export const RoleGuard = (props: RoleGuardProps) => {
  const userRole = useUserRole();
  const authStatus = useAuthStatus();
  const isAuthenticated = authStatus === AuthStatus.Authenticated;

  if (!isAuthenticated) return null;

  if (Array.isArray(props.roles) && props.roles.some((r) => r === userRole)) {
    return <>{props.children}</>;
  }

  if (props.roles === userRole) {
    return <>{props.children}</>;
  }

  return null;
};
