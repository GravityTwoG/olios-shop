import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import classes from '../auth.module.scss';
import { paths } from '@olios-shop/admin/config/paths';
import { AuthStatus, useAuthStatus } from '@olios-shop/admin/shared/session';
import { $error, $isPending, formSubmitted } from './model';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Form } from '@olios-shop/ui/molecules/Form';
import { NavLink } from '@olios-shop/admin/ui/atoms/NavLink';
import { AnonymousPage } from '@olios-shop/admin/features/Auth';

export const SignUpPage = AnonymousPage(() => {
  const navigate = useNavigate();
  const authStatus = useAuthStatus();

  const [isPending, error] = useUnit([$isPending, $error]);
  const formSubmittedEvent = useUnit(formSubmitted);

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

        <Form
          className="py-2"
          config={{
            email: {
              type: 'email',
              placeholder: 'example@ex.com',
              label: 'Email',
              required: 'Email is required!',
            },
            password: {
              type: 'password',
              placeholder: 'password',
              label: 'Password',
              required: 'Password is required!',
            },
            inviteCode: {
              type: 'text',
              placeholder: 'invite-code',
              label: 'Invite code',
              required: 'Invite code is required!',
            },
          }}
          onSubmit={async (data) => {
            formSubmittedEvent(data);
            return '';
          }}
          submitText="Sign up"
          isPending={isPending}
          error={error}
          submitButtonVariant="CTA"
        />
      </Paper>
    </div>
  );
});
