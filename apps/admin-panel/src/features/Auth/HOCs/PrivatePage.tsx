import { useNavigate } from 'react-router-dom';

import {
  AuthStatus,
  SessionUserRole,
  useAuthStatus,
  useUserRole,
} from '@olios-shop/admin/shared/session';
import { paths } from '@olios-shop/admin/config/paths';

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
    const navigate = useNavigate();

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
      navigate(paths.login({}));
      return null;
    }

    return (
      <Container className="h-full flex justify-center items-center">
        <H1>Forbidden</H1>
      </Container>
    );
  };
};
