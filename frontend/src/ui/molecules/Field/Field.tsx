import React from 'react';
import clsx from 'clsx';

import classes from './field.module.scss';

import { ReactTagProps } from '../../types';

export type FieldProps = ReactTagProps<'label'> & { label: string };

export const Field = ({ label, children, ...props }: FieldProps) => {
  return (
    <label {...props} className={clsx(props.className, classes.label)}>
      {label && <p className={classes['label__title']}>{label}</p>}
      {children}
    </label>
  );
};
