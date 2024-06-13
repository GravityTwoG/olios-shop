import { useEffect } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.scss';
import { paths } from '@olios-shop/storefront/paths';
import {
  AuthStatus,
  useAuthStatus,
} from '@olios-shop/storefront/shared/session';

import { AnonymousPage } from '@olios-shop/storefront/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { NavLink } from '@olios-shop/storefront/ui/atoms/NavLink';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';
import { RegisterForm } from '@olios-shop/storefront/features/Auth';

function SignUpPage() {
  const router = useRouter();
  const authStatus = useAuthStatus();

  useEffect(() => {
    if (authStatus === AuthStatus.Authenticated) {
      router.replace('/profile');
    }
  }, [authStatus, router]);

  return (
    <div className={classes.page}>
      <MetaTags title="Sign Up" />

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
            href={paths.registerCustomer({})}
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign Up
          </NavLink>
        </nav>

        <RegisterForm />
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignUpPage);
