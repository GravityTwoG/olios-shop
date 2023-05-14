import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $authStatus, AuthStatus } from './shared/session';
import { paths } from './paths';

export const AnonymousPage = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
) => {
  return function Anonymous(props: P) {
    const router = useRouter();
    const authStatus = useStore($authStatus);

    useEffect(() => {
      if (authStatus === AuthStatus.Authenticated) {
        router.replace(paths.profile({}));
      }
    }, [authStatus, router]);

    if (authStatus === AuthStatus.Pending) {
      return <div>Loading</div>;
    }

    if (authStatus === AuthStatus.Anonymous) {
      return <Component {...props} />;
    }

    return null;
  };
};
