import React from 'react';
import classes from './sidebar.module.scss';

import Link from 'next/link';
import { NavLink } from '../../atoms/NavLink';
import { BurgerButton } from '../../molecules/BurgerButton';

import HomeIcon from './img/Home.svg';
import BasketIcon from './img/Basket.svg';
import SearchIcon from './img/Search.svg';
import AboutIcon from './img/About.svg';
import ProfileIcon from './img/Profile.svg';

export default function Sidebar(props) {
  return (
    <aside className={`${classes.sidebar} ${props.className}`}>
      <Link href="/" className={classes.SidebarLogo}>
        <img src="/LOGO.png" alt="Olios Shop" />
      </Link>

      <MainNavigation />

      <div>
        <NavLink
          href="/profile"
          className={classes.NavItem}
          activeClassName={classes.NavItemActive}
        >
          <ProfileIcon />
        </NavLink>
        <NavLink
          href="/about"
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
        href="/home"
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        href="/basket"
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <BasketIcon />
      </NavLink>
      <NavLink
        href="/search"
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <SearchIcon />
      </NavLink>
    </nav>
  );
}
