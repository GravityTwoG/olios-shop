import { useStore } from 'effector-react';

import { paths } from '@/src/paths';
import { IUserRole } from '@/src/types/IUser';

import { UserCard } from '@/src/features/Auth';
import { $user, $authStatus, AuthStatus, logoutFx } from '@/src/shared/session';

import Link from 'next/link';
import { Button } from '@/src/ui/atoms/Button';
import { Flex } from '@/src/ui/atoms/Flex';
import { Container } from '@/src/ui/atoms/Container';
import { PrivatePage } from '@/src/PrivatePage';

function ProfilePage() {
  const authStatus = useStore($authStatus);
  const user = useStore($user);

  return (
    <Container className="py-8">
      <UserCard user={user} isLoaded={authStatus !== AuthStatus.Pending} />

      {user.role === IUserRole.CONTENT_MANAGER && (
        <Flex jcc margin="1rem 0">
          <Link href={paths.content({})}>Manage content</Link>
        </Flex>
      )}

      <Flex jcc margin="1rem 0">
        <Button onClick={() => logoutFx()}>logout</Button>
      </Flex>
    </Container>
  );
}

export default PrivatePage(ProfilePage);
