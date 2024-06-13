import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUnit } from 'effector-react';

import classes from '../auth.module.scss';
import { paths } from '@olios-shop/storefront/paths';
import {
  AuthStatus,
  useAuthStatus,
} from '@olios-shop/storefront/shared/session';
import { $error, $isPending, formSubmitted } from './index.model';

import { AnonymousPage } from '@olios-shop/storefront/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Form } from '@olios-shop/ui/molecules/Form';
import { NavLink } from '@olios-shop/storefront/ui/atoms/NavLink';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';

function SignUpPage() {
  const router = useRouter();
  const authStatus = useAuthStatus();

  const [error, isPending] = useUnit([$error, $isPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

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
              // validate: {
              //   minLength: {
              //     value: 8,
              //     message: 'Password should be at least 8 characters',
              //   },
              // },
            },
            password2: {
              type: 'password',
              placeholder: 'confirm password',
              label: 'Confirm password',
              required: 'Please confirm password!',
              // validate: {
              //   matchesPreviousPassword: (value) => {
              //     const { password } = getValues();
              //     return password === value || 'Passwords should match!';
              //   },
              // },
            },
          }}
          onSubmit={async (data) => {
            formSubmittedEvent({ email: data.email, password: data.password });
            return '';
          }}
          isPending={isPending}
          error={error}
          submitText="Sign up"
          submitButtonVariant="CTA"
        />
      </Paper>
    </div>
  );
}

export default AnonymousPage(SignUpPage);
