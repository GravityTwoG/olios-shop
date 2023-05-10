import React from 'react';
import classes from './input-field.module.scss';

export type InputFieldProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  type = 'text',
  label,
  ...props
}: InputFieldProps) => {
  return (
    <label className={classes.label}>
      {label && <p className={classes['label__title']}>{label}</p>}
      <input
        {...props}
        type={type}
        className={
          classes.input + (props.className ? ' ' + props.className : '')
        }
      />
    </label>
  );
};
