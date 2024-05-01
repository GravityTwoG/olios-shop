import React from 'react';

import { useUnit } from 'effector-react';
import { $isPending, $error, formSubmitted } from './model';

import { Form } from '@/src/ui/molecules/Form';

export const RegisterEmployeeForm = () => {
  const [isPending, error] = useUnit([$isPending, $error]);

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
  );
};
