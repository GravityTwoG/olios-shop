import { useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  AuthStatus,
  SessionUserRole,
  useAuthStatus,
  useUserRole,
} from '@/src/shared/session';
import { paths } from '@/src/paths';

import { PageLoader } from '@/src/ui/atoms/PageLoader';
import { Container } from '@/src/ui/atoms/Container';
import { H1 } from '@/src/ui/atoms/Typography';

export const PrivatePage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  allowedRoles: SessionUserRole[],
) => {
  return function Protected(props: P) {
    const authStatus = useAuthStatus();
    const userRole = useUserRole();

    if (
      authStatus === AuthStatus.Pending ||
      authStatus === AuthStatus.Initial
    ) {
      return <PageLoader />;
    }

    if (allowedRoles.length !== 0 && allowedRoles.includes(userRole)) {
      return <Component {...props} />;
    }

    return <Redirect authStatus={authStatus} />;
  };
};

type RedirectProps = {
  authStatus: AuthStatus;
};

const Redirect = ({ authStatus }: RedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (authStatus === AuthStatus.Anonymous) {
      router.replace(paths.login({}));
    }
  }, [authStatus, router]);

  return (
    <Container className="h-full flex justify-center items-center">
      <H1>Forbidden</H1>
    </Container>
  );
};
