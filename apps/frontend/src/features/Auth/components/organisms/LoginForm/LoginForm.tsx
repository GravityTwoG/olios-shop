import React from 'react';
import { useForm } from 'react-hook-form';

import { useUnit } from 'effector-react';
import { $loginError, $isLoginPending, formSubmitted } from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const LoginForm = () => {
  const [error, isPending] = useUnit([$loginError, $isLoginPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
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
        {...register('password', {
          required: 'Password is required!',
          minLength: { value: 8, message: 'Min length is 8!' },
        })}
      />
      <FormError>{errors.password?.message}</FormError>

      <FormError>{error || errors.root?.message}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign In
      </CTAButton>
    </Form>
  );
};
