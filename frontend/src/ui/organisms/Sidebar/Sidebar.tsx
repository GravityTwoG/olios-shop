import React from 'react';
import classes from './sidebar.module.scss';

import { paths } from '@/src/paths';

import Link from 'next/link';
import { NavLink } from '../../atoms/NavLink';
import { BurgerButton } from '../../molecules/BurgerButton';

import HomeIcon from './img/Home.svg';
import BasketIcon from './img/Basket.svg';
import SearchIcon from './img/Search.svg';
import AboutIcon from './img/About.svg';
import ProfileIcon from './img/Profile.svg';

export type SidebarProps = {
  className?: string;
  onBurgerMenuClick: () => void;
  burgerMenuOpened: boolean;
};

export default function Sidebar(props: SidebarProps) {
  return (
    <aside className={`${classes.sidebar} ${props.className}`}>
      <Link href={paths.home({})} className={classes.SidebarLogo}>
        <img src="/LOGO.png" alt="Olios Shop" />
      </Link>

      <MainNavigation />

      <div>
        <NavLink
          href={paths.profile({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <ProfileIcon />
        </NavLink>
        <NavLink
          href={paths.about({})}
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <AboutIcon />
        </NavLink>
      </div>

      <BurgerButton
        onClick={props.onBurgerMenuClick}
        isOpened={props.burgerMenuOpened}
        className={classes.SidebarBurger}
      />
    </aside>
  );
}

function MainNavigation() {
  return (
    <nav className={classes.nav}>
      <NavLink
        href={paths.home({})}
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        href={paths.basket({})}
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <BasketIcon />
      </NavLink>
      <NavLink
        href={paths.search({})}
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <SearchIcon />
      </NavLink>
    </nav>
  );
}
