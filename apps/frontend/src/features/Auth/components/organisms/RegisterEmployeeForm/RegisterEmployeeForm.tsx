import React from 'react';
import { useForm } from 'react-hook-form';

import { useUnit } from 'effector-react';
import { $isPending, $error, formSubmitted } from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const RegisterEmployeeForm = () => {
  const [isPending, error] = useUnit([$isPending, $error]);

  const formSubmittedEvent = useUnit(formSubmitted);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      inviteCode: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent(data);
  });

  return (
    <Form className="py-2" onSubmit={onSubmit}>
      <InputField
        label="Email"
        placeholder="email"
        {...register('email', { required: 'Email is required!' })}
      />
      <FormError>{errors.email?.message}</FormError>

      <InputField
        label="Password"
        placeholder="password"
        type="password"
        {...register('password', { required: 'Password is required!' })}
      />
      <FormError>{errors.password?.message}</FormError>

      <InputField
        label="Invite code"
        placeholder="invite-code"
        {...register('inviteCode', { required: 'Invite code is required!' })}
      />
      <FormError>{errors.inviteCode?.message}</FormError>

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign Up
      </CTAButton>
    </Form>
  );
};
