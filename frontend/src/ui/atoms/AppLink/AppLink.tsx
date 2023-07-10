import classes from './app-link.module.scss';

import Link, { LinkProps } from 'next/link';

export type AppLinkProps = LinkProps & { children?: React.ReactNode };

export const AppLink = (props: AppLinkProps) => {
  return <Link {...props} className={classes.AppLink} />;
};
