import React from 'react';

import { Input, InputProps } from '../../atoms/Input';
import { Field } from '../Field';

export type InputFieldProps = {
  label: string;
} & InputProps;

export const InputField = ({ label, ...props }: InputFieldProps) => {
  return (
    <Field label={label}>
      <Input {...props} />
    </Field>
  );
};
