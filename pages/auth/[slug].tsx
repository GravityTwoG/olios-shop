import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import {
  $isAuthorizationChecked,
  $isAuthorized,
  LoginForm,
  RegisterForm,
} from '../../features/Auth';
import classes from './auth.module.scss';
import { NavLink } from '@/ui/atoms/NavLink';

export default function AuthPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();

  const isAuthorized = useStore($isAuthorized);
  const isAuthorizationChecked = useStore($isAuthorizationChecked);

  useEffect(() => {
    if (!props.slug) {
      router.replace('/auth/sign-in');
    }
  }, [props.slug]);

  useEffect(() => {
    if (isAuthorized && isAuthorizationChecked) {
      router.replace('/profile');
    }
  }, [isAuthorized, isAuthorizationChecked]);

  return (
    <div className={classes.page}>
      <div className={classes['card']}>
        <nav className={classes['local_nav']}>
          <NavLink
            href="/auth/sign-in"
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign In
          </NavLink>
          <NavLink
            href="/auth/sign-up"
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign Up
          </NavLink>
        </nav>

        {props.slug === 'sign-in' && <LoginForm />}
        {props.slug === 'sign-up' && <RegisterForm />}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'sign-in' } }, { params: { slug: 'sign-up' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return { props: { slug: ctx.params?.slug || null } };
};
