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

import Link from 'next/link';
import { Flex } from '@/src/ui/atoms/Flex';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';

function ProfilePage() {
  const authStatus = useAuthStatus();
  const user = useUser();

  return (
    <Container className="py-8">
      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      {user.role === IUserRole.CONTENT_MANAGER && (
        <Flex jcc margin="1rem 0">
          <Link href={paths.content({})}>Manage content</Link>
        </Flex>
      )}

      {user.role === IUserRole.MANAGER && (
        <Flex jcc margin="1rem 0">
          <Link href={paths.users({})}>Manage Users</Link>
        </Flex>
      )}

      <Flex jcc margin="1rem 0">
        <CTAButton onClick={() => logoutFx()}>logout</CTAButton>
      </Flex>
    </Container>
  );
}

export default PrivatePage(ProfilePage, []);
