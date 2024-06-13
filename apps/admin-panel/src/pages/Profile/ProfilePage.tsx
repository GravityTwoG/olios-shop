import { useUnit } from 'effector-react';

import {
  AuthStatus,
  SessionUserRole,
  logout,
  useAuthStatus,
  useUser,
} from '@olios-shop/admin/shared/session';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { Container } from '@olios-shop/ui/atoms/Container';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { UserCard } from './UserCard';

export const ProfilePage = PrivatePage(() => {
  const authStatus = useAuthStatus();
  const user = useUser();

  const logoutEvent = useUnit(logout);

  return (
    <Container className="py-8">
      <H1>Profile</H1>

      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      <div className="flex justify-center my-8">
        <div>
          <CTAButton color="secondary" onClick={() => logoutEvent()}>
            logout
          </CTAButton>
        </div>
      </div>
    </Container>
  );
}, [SessionUserRole.CONTENT_MANAGER, SessionUserRole.MANAGER]);
