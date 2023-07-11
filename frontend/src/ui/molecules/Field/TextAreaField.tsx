import React from 'react';

import { TextArea, TextAreaProps } from '../../atoms/TextArea';
import { Field } from '../Field';

export type TextAreaFieldProps = {
  label: string;
} & TextAreaProps;

export const TextAreaField = ({ label, ...props }: TextAreaFieldProps) => {
  return (
    <Field label={label}>
      <TextArea {...props} />
    </Field>
  );
};
