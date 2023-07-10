import React, { ReactNode, useState } from 'react';
import classes from './layout.module.scss';

import { AppToaster } from '@/src/shared/toasts';
import { BurgerButton } from '../../molecules/BurgerButton';
import Sidebar from '../Sidebar/Sidebar';
import { Menu } from '../Menu';

export type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened((bool) => !bool);
  };

  return (
    <div className={classes.App}>
      <Sidebar onBurgerMenuClick={toggleMenu} burgerMenuOpened={isMenuOpened} />

      <div className={classes.content}>
        {children}
        <div className={classes.AppBurgerButton}>
          <BurgerButton onClick={toggleMenu} isOpened={isMenuOpened} />
        </div>
      </div>

      <Menu isOpened={isMenuOpened} />
      <AppToaster />
    </div>
  );
}
