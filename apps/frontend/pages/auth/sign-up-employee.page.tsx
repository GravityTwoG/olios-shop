import { useEffect } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.scss';
import { paths } from '@/src/paths';
import { AuthStatus, useAuthStatus } from '@/src/shared/session';

import { AnonymousPage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { NavLink } from '@/src/ui/atoms/NavLink';
import { RegisterEmployeeForm } from '@/src/features/Auth';

function SignUpPageEmployee() {
  const router = useRouter();
  const authStatus = useAuthStatus();

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
            href={paths.registerCustomer({})}
            className={classes['local_nav__item']}
            activeClassName={classes['active']}
          >
            Sign Up
          </NavLink>
        </nav>

        <RegisterEmployeeForm />
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignUpPageEmployee);
