import { ReactNode } from 'react';

import {
  AuthStatus,
  SessionUserRole,
  useAuthStatus,
  useUserRole,
} from '../session';

export type RoleGuardProps = {
  roles: SessionUserRole | SessionUserRole[];
  children?: ReactNode;
};

export const RoleGuard = (props: RoleGuardProps) => {
  const userRole = useUserRole();
  const authStatus = useAuthStatus();
  const isPending =
    authStatus === AuthStatus.Initial || authStatus === AuthStatus.Pending;

  if (isPending) {
    return null;
  }

  if (props.roles === userRole) {
    return <>{props.children}</>;
  }

  if (Array.isArray(props.roles) && props.roles.includes(userRole)) {
    return <>{props.children}</>;
  }

  return null;
};
