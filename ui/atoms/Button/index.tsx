import React from 'react';
import classes from './button.module.scss';

export type ButtonProps = {} & React.HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
        type="button"
        {...props}
        className={`${classes.BaseButton} ${props.className || ''}`}
    />
  );
};
