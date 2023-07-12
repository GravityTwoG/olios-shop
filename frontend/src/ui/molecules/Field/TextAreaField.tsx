import React, { useId } from 'react';

import { TextArea, TextAreaProps } from '../../atoms/TextArea';
import { Field } from '../Field';

export type TextAreaFieldProps = {
  label: string;
} & TextAreaProps;

export const TextAreaField = ({ label, ...props }: TextAreaFieldProps) => {
  const internalId = useId();
  const id = props.id || internalId;

  return (
    <Field label={label}>
      <TextArea {...props} id={id} />
    </Field>
  );
};
