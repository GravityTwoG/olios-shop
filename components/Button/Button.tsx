import React from 'react';
import Link from 'next/link';
import classes from './button.module.scss';

export type ButtonProps = {
  isLink?: boolean;
  href?: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
  if (props.isLink) {
    return (
      <span className={classes.BaseButton}>
        {props.isLink && <Link href={props.href!}>{props.children}</Link>}
      </span>
    );
  }

  return (
    <button className={classes.BaseButton}>
      {props.isLink && <Link href={props.href!}>{props.children}</Link>}
    </button>
  );
};
