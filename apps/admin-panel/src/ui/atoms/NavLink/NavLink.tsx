export type NavLinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export const NavLink = (props: NavLinkProps) => {
  return props.children;
};
