import React from 'react';
import { useForm } from 'react-hook-form';

import { useUnit } from 'effector-react';
import { $isPending, $error, formSubmitted } from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const RegisterForm = () => {
  const [error, isPending] = useUnit([$error, $isPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password2: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({ email: data.email, password: data.password });
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

      <InputField
        label="Confirm password"
        placeholder="confirm password"
        type="password"
        {...register('password2', {
          required: 'Please confirm password!',
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || 'Passwords should match!';
            },
          },
        })}
      />
      <FormError>{errors.password2?.message}</FormError>

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign Up
      </CTAButton>
    </Form>
  );
};
