import React from 'react';
import classes from './burger-button.module.scss';

export function BurgerMenu(props) {
  return (
    <div
      className={
        props.opened
          ? `${classes.BurgerButton} ${classes.BurgerButtonActive} ${props.className}`
          : `${classes.BurgerButton} ${props.className}`
      }
      onClick={props.onClick}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
