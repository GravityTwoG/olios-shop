import React, { useState } from 'react';
import classes from './layout.module.scss';

import Sidebar from '../Sidebar/Sidebar';
import { BurgerButton } from '../../molecules/BurgerButton';
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
      />

      <div className={classes.content}>
        {children}
        <div className={classes.AppBurgerButton}>
          <BurgerButton onClick={toggleMenu} isOpened={isMenuOpened}/>
        </div>
      </div>

      <Menu isOpened={isMenuOpened} />
    </div>
  );
}
