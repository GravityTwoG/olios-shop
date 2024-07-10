import { forwardRef } from 'react';
import { clsx } from 'clsx';
import classes from './burger-button.module.scss';
import { ReactTagProps } from '@olios-shop/ui/types';

export type BurgerButtonProps = {
  isOpened: boolean;
} & ReactTagProps<'button'>;

export const BurgerButton = forwardRef<HTMLButtonElement, BurgerButtonProps>(
  ({ isOpened, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          classes.BurgerButton,
          props.className,
          isOpened && classes.BurgerButtonActive,
        )}
      >
        <div />
        <div />
        <div />
      </button>
    );
  },
);
