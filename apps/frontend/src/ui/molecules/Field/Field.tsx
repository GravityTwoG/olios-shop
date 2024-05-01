import React from 'react';
import clsx from 'clsx';

import classes from './field.module.scss';

import { ReactTagProps } from '@/src/ui/types';

export type FieldProps = ReactTagProps<'label'> & { label: string };

export const Field = ({ label, children, ...props }: FieldProps) => {
  return (
    <div className={clsx(props.className, classes.Field)}>
      <label {...props} className={classes.Label}>
        <p className={classes.LabelText}>{label}</p>
      </label>
      {children}
    </div>
  );
};
