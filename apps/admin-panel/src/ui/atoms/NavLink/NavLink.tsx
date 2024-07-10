import clsx from 'clsx';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';

export type NavLinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export const NavLink = (props: NavLinkProps) => {
  return (
    <ReactRouterNavLink
      to={props.href}
      className={({ isActive }) =>
        isActive
          ? clsx(props.className, props.activeClassName)
          : props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </ReactRouterNavLink>
  );
};
