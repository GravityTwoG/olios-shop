import { useEffect } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.scss';
import { paths } from '@/src/paths';
import { AuthStatus, useAuthStatus } from '@/src/shared/session';

import { AnonymousPage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { NavLink } from '@/src/ui/atoms/NavLink';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { RegisterForm } from '@/src/features/Auth';

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

        <NavLink
          href={paths.registerEmployee({})}
          className={classes['local_nav_item_min']}
          activeClassName={classes['active']}
        >
          Sign Up for employees
        </NavLink>
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignUpPage);
