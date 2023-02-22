import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export type NavLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
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
