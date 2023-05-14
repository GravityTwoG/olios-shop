import React from 'react';
import classes from './button.module.scss';
import { Spinner } from '../Spinner';

export type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`${classes.BaseButton} relative  ${props.className || ''}`}
    >
      <span
        className={`-z-10 ${props.isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {props.children}
      </span>
      {props.isLoading && (
        <Spinner className="absolute h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />
      )}
    </button>
  );
};
