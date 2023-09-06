import { useUnit } from 'effector-react';

import { paths } from '@/src/paths';

import {
  AuthStatus,
  SessionUserRole,
  logout,
  useAuthStatus,
  useUser,
} from '@/src/shared/session';

import { PrivatePage } from '@/src/features/Auth';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { AppLink } from '@/src/ui/atoms/AppLink';
import { H1 } from '@/src/ui/atoms/Typography';
import { RoleGuard } from '@/src/shared/components/RoleGuard';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { UserCard } from '@/src/features/Auth';

function ProfilePage() {
  const authStatus = useAuthStatus();
  const user = useUser();

  const [logoutEvent] = useUnit([logout]);

  return (
    <Container className="py-8">
      <MetaTags title="Profile" />

      <H1>Profile</H1>

      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      <RoleGuard roles={SessionUserRole.CUSTOMER}>
        <div className="flex justify-center my-4">
          <AppLink href={paths.orders({})}>Orders</AppLink>
        </div>
      </RoleGuard>

      <RoleGuard roles={SessionUserRole.CONTENT_MANAGER}>
        <div className="flex justify-center my-4">
          <AppLink href={paths.content({})}>Manage content</AppLink>
        </div>
      </RoleGuard>

      <RoleGuard roles={SessionUserRole.MANAGER}>
        <div className="flex justify-center my-4">
          <AppLink href={paths.users({})}>Manage Users</AppLink>
        </div>

        <div className="flex justify-center my-4">
          <AppLink href={paths.inviteCodes({})}>Manage Invite Codes</AppLink>
        </div>

        <div className="flex justify-center my-4">
          <AppLink href={paths.manageOrders({})}>Manage Orders</AppLink>
        </div>
      </RoleGuard>

      <div className="flex justify-center my-8">
        <div>
          <CTAButton color="secondary" onClick={() => logoutEvent()}>
            logout
          </CTAButton>
        </div>
      </div>
    </Container>
  );
}

export default PrivatePage(ProfilePage, [
  SessionUserRole.CUSTOMER,
  SessionUserRole.CONTENT_MANAGER,
  SessionUserRole.MANAGER,
]);
