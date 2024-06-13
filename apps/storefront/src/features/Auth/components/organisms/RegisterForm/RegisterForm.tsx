import React from 'react';
import { useUnit } from 'effector-react';

import { Form } from '@olios-shop/ui/molecules/Form';
import { $isPending, $error, formSubmitted } from './model';

export const RegisterForm = () => {
  const [error, isPending] = useUnit([$error, $isPending]);

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
  );
};
