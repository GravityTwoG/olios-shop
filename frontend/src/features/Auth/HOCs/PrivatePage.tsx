import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IUserRole } from '@/src/types/IUser';
import { AuthStatus, useAuthStatus, useUserRole } from '@/src/shared/session';
import { paths } from '@/src/paths';

import { PageLoader } from '@/src/ui/atoms/PageLoader';
import { Container } from '@/src/ui/atoms/Container';
import { H1 } from '@/src/ui/atoms/Typography';

export const PrivatePage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  allowedRoles: IUserRole[],
) => {
  return function Protected(props: P) {
    const router = useRouter();
    const authStatus = useAuthStatus();
    const userRole = useUserRole();

    useEffect(() => {
      if (authStatus === AuthStatus.Anonymous) {
        router.replace(paths.login({}));
      }
    }, [authStatus, router]);

    if (authStatus === AuthStatus.Pending) {
      return <PageLoader />;
    }

    if (
      authStatus === AuthStatus.Authenticated &&
      (allowedRoles.length === 0 || allowedRoles.includes(userRole))
    ) {
      return <Component {...props} />;
    }

    return (
      <Container className="h-full flex justify-center items-center">
        <H1>Forbidden</H1>
      </Container>
    );
  };
};
