import clsx from 'clsx';
import classes from './input.module.scss';

import { ReactTagProps } from '../../types';

export type InputProps = ReactTagProps<'input'>;

export const Input = ({ type = 'text', ...props }: InputProps) => {
  return (
    <input
      {...props}
      type={type}
      className={clsx(classes.Input, props.className)}
    />
  );
};
