import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthStatus, useAuthStatus } from '@olios-shop/frontend/shared/session';
import { paths } from '@olios-shop/frontend/paths';

import { PageLoader } from '@olios-shop/ui/atoms/PageLoader';

export const AnonymousPage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
) => {
  return function Anonymous(props: P) {
    const router = useRouter();
    const authStatus = useAuthStatus();

    useEffect(() => {
      if (authStatus === AuthStatus.Authenticated) {
        router.replace(paths.profile({}));
      }
    }, [authStatus, router]);

    if (authStatus === AuthStatus.Pending) {
      return <PageLoader />;
    }

    if (authStatus === AuthStatus.Anonymous) {
      return <Component {...props} />;
    }

    return null;
  };
};
