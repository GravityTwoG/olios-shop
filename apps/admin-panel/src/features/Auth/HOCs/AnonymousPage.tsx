import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthStatus, useAuthStatus } from '@olios-shop/admin/shared/session';
import { paths } from '@olios-shop/admin/config/paths';

import { PageLoader } from '@olios-shop/ui/atoms/PageLoader';

export const AnonymousPage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
) => {
  return function Anonymous(props: P) {
    const navigate = useNavigate();
    const authStatus = useAuthStatus();

    useEffect(() => {
      if (authStatus === AuthStatus.Authenticated) {
        navigate(paths.profile({}));
      }
    }, [authStatus, navigate]);

    if (authStatus === AuthStatus.Pending) {
      return <PageLoader />;
    }

    if (authStatus === AuthStatus.Anonymous) {
      return <Component {...props} />;
    }

    return null;
  };
};
