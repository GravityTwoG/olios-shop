import React from 'react';
import classes from './input-field.module.scss';

export type InputFieldProps = {
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
  name?: React.InputHTMLAttributes<HTMLInputElement>['name'];
};

export const InputField = ({
  type = 'text',
  label,
  ...props
}: InputFieldProps) => {
  return (
    <label className={classes.label}>
      {label && <p className={classes['label__title']}>{label}</p>}
      <input
        className={classes.input}
        type={type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
      />
    </label>
  );
};
