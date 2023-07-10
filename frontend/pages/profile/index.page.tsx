import { paths } from '@/src/paths';
import { IUserRole } from '@/src/types/IUser';

import { UserCard } from '@/src/features/Auth';
import {
  AuthStatus,
  logoutFx,
  useAuthStatus,
  useUser,
} from '@/src/shared/session';

import { PrivatePage } from '@/src/features/Auth';

import { Flex } from '@/src/ui/atoms/Flex';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { AppLink } from '@/src/ui/atoms/AppLink';

function ProfilePage() {
  const authStatus = useAuthStatus();
  const user = useUser();

  return (
    <Container className="py-8">
      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      {user.role === IUserRole.CONTENT_MANAGER && (
        <Flex jcc margin="1rem 0">
          <AppLink href={paths.content({})}>Manage content</AppLink>
        </Flex>
      )}

      {user.role === IUserRole.MANAGER && (
        <Flex jcc margin="1rem 0">
          <AppLink href={paths.users({})}>Manage Users</AppLink>
        </Flex>
      )}
      {user.role === IUserRole.MANAGER && (
        <Flex jcc margin="1rem 0">
          <AppLink href={paths.inviteCodes({})}>Manage Invite Codes</AppLink>
        </Flex>
      )}

      <Flex jcc margin="1rem 0">
        <CTAButton onClick={() => logoutFx()}>logout</CTAButton>
      </Flex>
    </Container>
  );
}

export default PrivatePage(ProfilePage, []);
