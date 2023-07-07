import React, { ReactNode } from 'react';
import classes from './field.module.scss';

export type FieldProps = {
  label?: string;
  children: ReactNode;
};

export const Field = ({ label, ...props }: FieldProps) => {
  return (
    <label className={classes.label}>
      {label && <p className={classes['label__title']}>{label}</p>}
      {props.children}
    </label>
  );
};
