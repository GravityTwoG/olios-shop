import { useEffect } from 'react';
import classes from './profile.module.scss';

import { useStore } from 'effector-react';
import { useRouter } from 'next/router';

import { IUserRole } from '@/src/types/IUser';

import {
  $isAuthorizationChecked,
  $isAuthorized,
  $user,
  logoutFx,
  UserCard,
} from '@/src/features/Auth';

import { Button } from '../../src/ui/atoms/Button';
import { Flex } from '@/src/ui/atoms/Flex';
import Link from 'next/link';

const authPath = '/auth/sign-in';

export default function ProfilePage() {
  const router = useRouter();
  const isAuthorized = useStore($isAuthorized);
  const isAuthorizationChecked = useStore($isAuthorizationChecked);
  const user = useStore($user);

  useEffect(() => {
    if (!isAuthorized && isAuthorizationChecked) {
      router.replace(authPath);
    }
  }, [isAuthorized, isAuthorizationChecked]);

  return (
    <div className={classes.screen}>
      <div className={classes.container}>
        <UserCard user={user} isAuthorizationChecked={isAuthorizationChecked} />

        {user.role === IUserRole.CONTENT_MANAGER && (
          <Flex jcc margin="1rem 0">
            <Link href="/content">Manage content</Link>
          </Flex>
        )}

        <Flex jcc margin="1rem 0">
          <Button onClick={() => logoutFx()}>logout</Button>
        </Flex>
      </div>
    </div>
  );
}
