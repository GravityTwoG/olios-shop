import React, { useState } from 'react';
import classes from './login-form.module.scss';

import { useStore } from 'effector-react';

import { Button } from '@/src/ui/atoms/Button';
import { InputField } from '@/src/ui/atoms/InputField';
import { $loginError, formSubmitted } from './model';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useStore($loginError);

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

      <Button type="submit">Sign In</Button>
    </form>
  );
};
