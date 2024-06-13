import { useUnit } from 'effector-react';

import { paths } from '@olios-shop/storefront/paths';

import {
  AuthStatus,
  SessionUserRole,
  logout,
  useAuthStatus,
  useUser,
} from '@olios-shop/storefront/shared/session';

import { PrivatePage } from '@olios-shop/storefront/features/Auth';

import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { Container } from '@olios-shop/ui/atoms/Container';
import { AppLink } from '@olios-shop/storefront/ui/atoms/AppLink';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';
import { UserCard } from '@olios-shop/storefront/features/Auth';

function ProfilePage() {
  const authStatus = useAuthStatus();
  const user = useUser();

  const [logoutEvent] = useUnit([logout]);

  return (
    <Container className="py-8">
      <MetaTags title="Profile" />

      <H1>Profile</H1>

      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      <div className="flex justify-center my-4">
        <AppLink href={paths.orders({})}>Orders</AppLink>
      </div>

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
