import React, { useState } from 'react';
import classes from './register-form.module.scss';

import { useStore } from 'effector-react';
import { $registerError, formSubmitted } from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { InputField } from '@/src/ui/molecules/Field';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useStore($registerError);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitted({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmit} className={classes.form}>
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

      <p className={classes['form__error']}>{error}</p>

      <CTAButton type="submit">Sign Up</CTAButton>
    </form>
  );
};
