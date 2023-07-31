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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitted();
  };

  return (
    <Form className="py-2" onSubmit={onSubmit}>
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
      <InputField
        label="Invite code"
        placeholder="invite-code"
        value={inviteCode}
        onChange={(e) => inviteCodeChanged(e.target.value)}
      />

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isPending}>
        Sign Up
      </CTAButton>
    </Form>
  );
};
