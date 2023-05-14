import { useEffect } from 'react';

import { useStore } from 'effector-react';
import { useRouter } from 'next/router';

import { paths } from '@/src/paths';
import { IUserRole } from '@/src/types/IUser';

import { logoutFx, UserCard } from '@/src/features/Auth';
import { $user, $authStatus, AuthStatus } from '@/src/shared/session';

import Link from 'next/link';
import { Button } from '@/src/ui/atoms/Button';
import { Flex } from '@/src/ui/atoms/Flex';
import { Container } from '@/src/ui/atoms/Container';

const authPath = '/auth/sign-in';

export default function ProfilePage() {
  const router = useRouter();
  const authStatus = useStore($authStatus);
  const user = useStore($user);

  useEffect(() => {
    if (authStatus === AuthStatus.Anonymous) {
      router.replace(authPath);
    }
  }, [authStatus, router]);

  return (
    <Container className="py-8">
      <UserCard
        user={user}
        isAuthorizationChecked={
          authStatus === AuthStatus.Anonymous ||
          authStatus === AuthStatus.Authenticated
        }
      />

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
