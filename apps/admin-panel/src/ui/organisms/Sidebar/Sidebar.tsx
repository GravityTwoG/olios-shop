import clsx from 'clsx';
import classes from './sidebar.module.scss';

import { paths } from '@olios-shop/admin/config/paths';
import { useHideOnScroll } from '@olios-shop/ui/hooks/useHideOnScroll';

import { Link } from 'react-router-dom';
import HomeIcon from '@olios-shop/ui/atoms/Icons/Home.svg';
import ProfileIcon from '@olios-shop/ui/atoms/Icons/Profile.svg';
import { NavLink } from '@olios-shop/admin/ui/atoms/NavLink';

export type SidebarProps = {
  className?: string;
};

const headerHeight = 60;

export const Sidebar = (props: SidebarProps) => {
  const headerRef = useHideOnScroll({ scrollHeight: headerHeight });

  return (
    <aside
      className={clsx(
        classes.sidebar,
        props.className,
        // yarl gallery affects app layout
        // https://github.com/igordanchenko/yet-another-react-lightbox/blob/main/src/modules/NoScroll.tsx
        `yarl__no_scroll_padding`,
      )}
      ref={headerRef}
    >
      <Link to={paths.home({})} className={classes.SidebarLogo}>
        <img width={100} height={100} src="/LOGO.png" alt="Olios Shop" />
      </Link>

      <nav className={classes.nav}>
        <NavLink
          href={paths.home({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <HomeIcon />
        </NavLink>
      </nav>

      <nav className={classes.nav}>
        <NavLink
          href={paths.profile({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <ProfileIcon />
        </NavLink>
      </nav>
    </aside>
  );
};
