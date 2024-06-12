import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './auth.module.scss';
import { paths } from '@olios-shop/admin/config/paths';
import { AuthStatus, useAuthStatus } from '@olios-shop/admin/shared/session';

import { AnonymousPage } from '@olios-shop/admin/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { NavLink } from '@olios-shop/admin/ui/atoms/NavLink';
import { LoginForm } from '@olios-shop/admin/features/Auth';

export const SignInPage = AnonymousPage(() => {
  const navigate = useNavigate();
  const authStatus = useAuthStatus();

  useEffect(() => {
    if (authStatus === AuthStatus.Authenticated) {
      navigate(paths.profile({}));
    }
  }, [authStatus, navigate]);

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

        <LoginForm />
      </Paper>
    </div>
  );
});
