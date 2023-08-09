import React from 'react';
import clsx from 'clsx';
import classes from './button.module.scss';

import { ReactTagProps } from '../../types';

import { Spinner } from '../Spinner';

export type CTAButtonProps = {
  isLoading?: boolean;
  color?: 'primary' | 'secondary';
} & ReactTagProps<'button'>;

export const CTAButton: React.FC<CTAButtonProps> = ({
  isLoading,
  type = 'button',
  color = 'primary',
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(classes.BaseButton, 'relative', props.className, {
        [classes.ColorSecondary]: color === 'secondary',
        [classes.isLoading]: isLoading,
      })}
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
