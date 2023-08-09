import React from 'react';

import { useUnit } from 'effector-react';
import {
  $email,
  $error,
  $inviteCode,
  $isPending,
  $password,
  emailChanged,
  formSubmitted,
  inviteCodeChanged,
  passwordChanged,
} from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const RegisterEmployeeForm = () => {
  const [email, password, inviteCode, isPending, error] = useUnit([
    $email,
    $password,
    $inviteCode,
    $isPending,
    $error,
  ]);

  const [
    formSubmittedEvent,
    emailChangedEvent,
    passwordChangedEvent,
    inviteCodeChangedEvent,
  ] = useUnit([
    formSubmitted,
    emailChanged,
    passwordChanged,
    inviteCodeChanged,
  ]);

  return (
    <Form className="py-2" onSubmit={() => formSubmittedEvent()}>
      <InputField
        label="Email"
        placeholder="email"
        value={email}
        onChange={(e) => emailChangedEvent(e.target.value)}
      />
      <InputField
        label="Password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => passwordChangedEvent(e.target.value)}
      />
      <InputField
        label="Invite code"
        placeholder="invite-code"
        value={inviteCode}
        onChange={(e) => inviteCodeChangedEvent(e.target.value)}
      />

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign Up
      </CTAButton>
    </Form>
  );
};