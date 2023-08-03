import React from 'react';
import { useUnit } from 'effector-react';

import {
  $email,
  $emailError,
  $loginError,
  $isLoginPending,
  $password,
  $passwordError,
  emailChanged,
  formSubmitted,
  passwordChanged,
} from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const LoginForm = () => {
  const [email, emailError, password, passwordError, error, isPending] =
    useUnit([
      $email,
      $emailError,
      $password,
      $passwordError,
      $loginError,
      $isLoginPending,
    ]);

  const [formSubmittedEvent, emailChangedEvent, passwordChangedEvent] = useUnit(
    [formSubmitted, emailChanged, passwordChanged],
  );

  return (
    <Form className="py-2" onSubmit={() => formSubmittedEvent()}>
      <InputField
        label="Email"
        placeholder="email"
        value={email}
        onChange={(e) => emailChangedEvent(e.target.value)}
      />
      <FormError>{emailError}</FormError>

      <InputField
        label="Password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => passwordChangedEvent(e.target.value)}
      />
      <FormError>{passwordError}</FormError>

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign In
      </CTAButton>
    </Form>
  );
};
