import React, { useState } from 'react';

import { useStore } from 'effector-react';
import { $isLoading, $loginError, formSubmitted } from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';
import { Form, FormError } from '@/src/ui/molecules/Form';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useStore($loginError);
  const isLoading = useStore($isLoading);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitted({
      email,
      password,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        label="Email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <FormError>{error}</FormError>

      <CTAButton type="submit" isLoading={isLoading}>
        Sign In
      </CTAButton>
    </Form>
  );
};
