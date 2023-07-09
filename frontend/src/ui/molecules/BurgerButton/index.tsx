import React from 'react';
import classes from './burger-button.module.scss';

export type BurgerButtonProps = {
  isOpened: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export function BurgerButton(props: BurgerButtonProps) {
  return (
    <button
      className={
        props.isOpened
          ? `${classes.BurgerButton} ${classes.BurgerButtonActive} ${props.className}`
          : `${classes.BurgerButton} ${props.className}`
      }
      onClick={props.onClick}
    >
      <div />
      <div />
      <div />
    </button>
  );
}
