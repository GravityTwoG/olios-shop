import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavLink = ({ children, className, activeClassName, ...props }) => {
  const { asPath } = useRouter();

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const actualClassName =
    asPath === props.href || asPath === props.as
      ? `${className} ${activeClassName}`
      : className;

  return (
    <Link {...props}>
      <a className={actualClassName}>{children}</a>
    </Link>
  );
};
