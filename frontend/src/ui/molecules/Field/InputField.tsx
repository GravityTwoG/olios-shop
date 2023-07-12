import React, { useId } from 'react';

import { Input, InputProps } from '../../atoms/Input';
import { Field } from '../Field';

export type InputFieldProps = {
  label: string;
} & InputProps;

export const InputField = ({ label, ...props }: InputFieldProps) => {
  const internalId = useId();
  const id = props.id || internalId;

  return (
    <Field label={label} htmlFor={id}>
      <Input {...props} id={id} />
    </Field>
  );
};
