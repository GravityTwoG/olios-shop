import React, { useState } from 'react';
import classes from './register-form.module.scss';

import { useStore } from 'effector-react';
import { $registerError, registerFx } from '../../../store';

import { Button } from '@/src/ui/atoms/Button';
import { InputField } from '../../../../../ui/atoms/InputField';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerFx({
      email,
      password,
    });
  };

  const error = useStore($registerError);

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

      <Button type="submit">Sign Up</Button>
    </form>
  );
};
