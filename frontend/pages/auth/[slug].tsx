import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { paths } from '@/src/paths';
import { $authStatus, AuthStatus } from '@/src/shared/session';
import classes from './auth.module.scss';

import { LoginForm, RegisterForm } from '@/src/features/Auth';
import { NavLink } from '@/src/ui/atoms/NavLink';
import { AnonymousPage } from '@/src/AnonymousPage';
import { Paper } from '@/src/ui/atoms/Paper';

function AuthPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const authStatus = useStore($authStatus);

  useEffect(() => {
    if (!props.slug) {
      router.replace('/auth/sign-in');
    }
  }, [props.slug, router]);

  useEffect(() => {
    if (authStatus === AuthStatus.Authenticated) {
      router.replace('/profile');
    }
  }, [authStatus, router]);

  return (
    <div className={classes.page}>
      <Paper className={classes['card']}>
        <nav className={classes['local_nav']}>
          <NavLink
            href={paths.login({})}
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign In
          </NavLink>
          <NavLink
            href={paths.register({})}
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign Up
          </NavLink>
        </nav>

        {props.slug === 'sign-in' && <LoginForm />}
        {props.slug === 'sign-up' && <RegisterForm />}
      </Paper>
    </div>
  );
}

export default AnonymousPage(AuthPage);

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { slug: 'sign-in' } }, { params: { slug: 'sign-up' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = (ctx) => {
  return { props: { slug: ctx.params?.slug || null } };
};
