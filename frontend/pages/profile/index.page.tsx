import { paths } from '@/src/paths';
import { IUserRole } from '@/src/types/IUser';

import {
  AuthStatus,
  logoutFx,
  useAuthStatus,
  useUser,
} from '@/src/shared/session';

import { PrivatePage } from '@/src/features/Auth';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { AppLink } from '@/src/ui/atoms/AppLink';
import { RoleGuard } from '@/src/shared/components/RoleGuard';
import { UserCard } from '@/src/features/Auth';

function ProfilePage() {
  const authStatus = useAuthStatus();
  const user = useUser();

  return (
    <Container className="py-8">
      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      <RoleGuard roles={IUserRole.CUSTOMER}>
        <div className="flex justify-center my-4">
          <AppLink href={paths.orders({})}>Orders</AppLink>
        </div>
      </RoleGuard>

      <RoleGuard roles={IUserRole.CONTENT_MANAGER}>
        <div className="flex justify-center my-4">
          <AppLink href={paths.content({})}>Manage content</AppLink>
        </div>
      </RoleGuard>

      <RoleGuard roles={IUserRole.MANAGER}>
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
          <CTAButton color="secondary" onClick={() => logoutFx()}>
            logout
          </CTAButton>
        </div>
      </div>
    </Container>
  );
}

export default PrivatePage(ProfilePage, []);
