import React from 'react';

import { useUnit } from 'effector-react';
import {
  $email,
  $isPending,
  $password,
  $error,
  emailChanged,
  formSubmitted,
  passwordChanged,
} from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const RegisterForm = () => {
  const [email, password, error, isPending] = useUnit([
    $email,
    $password,
    $error,
    $isPending,
  ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitted();
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        label="Email"
        placeholder="email"
        value={email}
        onChange={(e) => emailChanged(e.target.value)}
      />
      <InputField
        label="Password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => passwordChanged(e.target.value)}
      />

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign Up
      </CTAButton>
    </Form>
  );
};
