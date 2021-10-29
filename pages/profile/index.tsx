import { useEffect } from 'react';
import classes from './profile.module.scss';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';

import {
  $isAuthorizationChecked,
  $isAuthorized,
  $user,
  logoutFx,
  UserCard,
} from '../../features/Auth';
import { Button } from '../../ui/atoms/Button';

const authPath = '/auth/sign-in';

export default function ProfilePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
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
      <UserCard user={user} />

      <Button onClick={() => logoutFx()}>logout</Button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req?.headers.cookie) {
    return {
      props: {},
      redirect: {
        destination: authPath,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
