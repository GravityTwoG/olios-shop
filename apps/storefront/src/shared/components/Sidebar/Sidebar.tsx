import React from 'react';
import clsx from 'clsx';
import classes from './sidebar.module.scss';

import { paths } from '@olios-shop/storefront/paths';
import { useHideOnScroll } from './useHideOnScroll';

import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from '@olios-shop/storefront/ui/atoms/NavLink';
import { BurgerButton } from '@olios-shop/ui/molecules/BurgerButton';

import HomeIcon from './img/Home.svg';
import BasketIcon from './img/Basket.svg';
import AboutIcon from './img/About.svg';
import ProfileIcon from './img/Profile.svg';

export type SidebarProps = {
  className?: string;
  onBurgerMenuClick: () => void;
  burgerMenuOpened: boolean;
  burgerButtonRef: React.RefObject<HTMLButtonElement>;
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
      <Link href={paths.home({})} className={classes.SidebarLogo}>
        <Image
          width={100}
          height={100}
          src="/LOGO.png"
          alt="Olios Shop"
          priority
        />
      </Link>

      <nav className={classes.nav}>
        <NavLink
          href={paths.home({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <HomeIcon />
        </NavLink>

        <NavLink
          href={paths.cart({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <BasketIcon />
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

        <NavLink
          href={paths.about({})}
          className={clsx(classes.NavItem, classes.hiddenOnMobileOrTablet)}
          activeClassName={classes.NavItemActive}
        >
          <AboutIcon />
        </NavLink>
      </nav>

      <BurgerButton
        onClick={props.onBurgerMenuClick}
        isOpened={props.burgerMenuOpened}
        className={classes.SidebarBurger}
        ref={props.burgerButtonRef}
      />
    </aside>
  );
};
