import React from 'react';
import clsx from 'clsx';
import classes from './button.module.scss';

import { ReactTagProps } from '../../types';

import { Spinner } from '../Spinner';

const colorMap = {
  primary: undefined,
  secondary: classes.ColorSecondary,
  danger: classes.ColorDanger,
};

export type ButtonProps = {
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'danger';
} & ReactTagProps<'button'>;

export const Button: React.FC<ButtonProps> = ({
  isLoading,
  type = 'button',
  color = 'primary',
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        classes.BaseButton,
        'relative',
        props.className,
        colorMap[color],
        {
          [classes.isLoading]: isLoading,
        },
      )}
      disabled={props.disabled || isLoading}
    >
      <span className={clsx('-z-10', isLoading ? 'opacity-0' : 'opacity-100')}>
        {props.children}
      </span>

      {isLoading && (
        <Spinner className="absolute h-4/5 w-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />
      )}
    </button>
  );
};
