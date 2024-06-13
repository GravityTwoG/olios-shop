import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

import {
  AuthStatus,
  SessionUserRole,
  useAuthStatus,
  useUserRole,
} from '@olios-shop/storefront/shared/session';
import { paths } from '@olios-shop/storefront/paths';

import { PageLoader } from '@olios-shop/ui/atoms/PageLoader';
import { Container } from '@olios-shop/ui/atoms/Container';
import { H1 } from '@olios-shop/ui/atoms/Typography';

export const PrivatePage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  allowedRoles: SessionUserRole[],
) => {
  return function Protected(props: P) {
    const authStatus = useAuthStatus();
    const userRole = useUserRole();

    const router = useRouter();

    useLayoutEffect(() => {
      if (authStatus === AuthStatus.Anonymous) {
        router.replace(paths.login({}));
      }
    }, [authStatus, router]);

    if (
      authStatus === AuthStatus.Pending ||
      authStatus === AuthStatus.Initial
    ) {
      return <PageLoader />;
    }

    if (allowedRoles.length !== 0 && allowedRoles.includes(userRole)) {
      return <Component {...props} />;
    }

    if (authStatus === AuthStatus.Anonymous) {
      return null;
    }

    return (
      <Container className="h-full flex justify-center items-center">
        <H1>Forbidden</H1>
      </Container>
    );
  };
};
