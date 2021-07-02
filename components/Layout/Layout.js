import React, { useState } from 'react';
import classes from './layout.module.scss';

import Sidebar from '../Sidebar/Sidebar';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Menu } from '../Menu';

export function Layout({ children }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened((bool) => !bool);
  };

  return (
    <div className={classes.App}>
      <Sidebar
        onBurgerMenuClick={toggleMenu}
        burgerMenuOpened={isMenuOpened}
        className={classes.AppSidebar}
      />

      <div className="content">
        {children}
        <div className={classes.AppBurgerButton}>
          <BurgerMenu onClick={toggleMenu} opened={isMenuOpened} />
        </div>
      </div>

      <Menu isOpened={isMenuOpened} />
    </div>
  );
}
