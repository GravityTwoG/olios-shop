import React from 'react';

import { useUnit } from 'effector-react';
import { $loginError, $isLoginPending, formSubmitted } from './model';

import { Form } from '@/src/ui/molecules/Form';

export const LoginForm = () => {
  const [error, isPending] = useUnit([$loginError, $isLoginPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  return (
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
  );
};
