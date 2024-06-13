import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUnit } from 'effector-react';

import classes from '../auth.module.scss';
import { paths } from '@olios-shop/storefront/paths';
import {
  AuthStatus,
  useAuthStatus,
} from '@olios-shop/storefront/shared/session';
import { $isLoginPending, $loginError, formSubmitted } from './index.model';

import { AnonymousPage } from '@olios-shop/storefront/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Form } from '@olios-shop/ui/molecules/Form';
import { NavLink } from '@olios-shop/storefront/ui/atoms/NavLink';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';

function SignInPage() {
  const router = useRouter();
  const authStatus = useAuthStatus();

  const [error, isPending] = useUnit([$loginError, $isLoginPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

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
          }}
          onSubmit={async (data) => {
            formSubmittedEvent(data);
            return '';
          }}
          submitText="Sign in"
          isPending={isPending}
          error={error}
          submitButtonVariant="CTA"
        />
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignInPage);
