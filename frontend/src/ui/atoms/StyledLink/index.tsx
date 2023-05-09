import React from 'react';
import Link from 'next/link';
import classes from '../Button/button.module.scss';

export type StyledLinkProps = {
  href: string;
};

export const StyledLink: React.FC<StyledLinkProps> = (props) => {
  return (
    <span className={classes.BaseButton}>
      {<Link href={props.href}>{props.children}</Link>}
    </span>
  );
};
