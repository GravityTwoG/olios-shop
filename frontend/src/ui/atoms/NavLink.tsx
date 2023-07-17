import React, { ReactNode } from 'react';
import clsx from 'clsx';

import { useRouter } from 'next/router';

import Link, { LinkProps } from 'next/link';

export type NavLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
};

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  className,
  activeClassName = 'active',
  ...props
}) => {
  const { asPath } = useRouter();

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as

  return (
    <Link
      {...props}
      className={clsx(
        className,
        (asPath === props.href || asPath === props.as) && activeClassName,
      )}
    >
      {children}
    </Link>
  );
};
