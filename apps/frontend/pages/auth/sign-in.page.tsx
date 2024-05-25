import { useEffect } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.scss';
import { paths } from '@olios-shop/frontend/paths';
import { AuthStatus, useAuthStatus } from '@olios-shop/frontend/shared/session';

import { AnonymousPage } from '@olios-shop/frontend/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { NavLink } from '@olios-shop/frontend/ui/atoms/NavLink';
import { MetaTags } from '@olios-shop/frontend/shared/components/MetaTags';
import { LoginForm } from '@olios-shop/frontend/features/Auth';

function SignInPage() {
  const router = useRouter();
  const authStatus = useAuthStatus();

  useEffect(() => {
    if (authStatus === AuthStatus.Authenticated) {
      router.replace('/profile');
    }
  }, [authStatus, router]);

  return (
    <div className={classes.page}>
      <MetaTags title="Sign In" />

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

        <LoginForm />
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignInPage);
