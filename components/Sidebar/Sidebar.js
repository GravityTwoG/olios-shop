import React from 'react';
import Link from 'next/link';
import { NavLink } from '../NavLink';

import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import classes from './sidebar.module.scss';

import HomeIcon from './img/Home.svg';
import BasketIcon from './img/Basket.svg';
import SearchIcon from './img/Search.svg';
import AboutIcon from './img/About.svg';

export default function Sidebar(props) {
  return (
    <aside className={`${classes.sidebar} ${props.className}`}>
      <Link href="/">
        <a className={classes.SidebarLogo}>
          <img src="/LOGO.png" alt="Olios Shop" />
        </a>
      </Link>

      <MainNavigation />

      <NavLink
        href="/about"
        className={classes.NavItem}
        activeClassName={classes.NavItemActive}
      >
        <AboutIcon />
      </NavLink>

      <BurgerMenu
        onClick={props.onBurgerMenuClick}
        opened={props.burgerMenuOpened}
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
