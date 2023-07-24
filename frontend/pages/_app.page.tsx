import React, { useEffect, useRef, useState } from 'react';
import classes from './_app.module.scss';

import { AppProps } from 'next/app';

import '@/src/styles/globals.css';
import '@/src/styles/theme.css';
import '@/src/styles/ui.scss';

import { fetchSessionFx } from '@/src/shared/session';

import { BurgerButton } from '@/src/ui/molecules/BurgerButton';
import Sidebar from '@/src/shared/components/Sidebar/Sidebar';
import { Menu } from '@/src/ui/organisms/Menu';
import { AppToaster } from '@/src/shared/toasts';
import { useOnClickOutside } from '@/src/ui/hooks/useOnClickOutside';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // check if user is already authenticated
    fetchSessionFx();
  }, []);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened((bool) => !bool);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);
  useOnClickOutside(menuRef, (e) => {
    if (
      e.target === buttonRef.current ||
      e.target === sidebarButtonRef.current
    ) {
      return;
    }

    setIsMenuOpened(false);
  });

  return (
    <div className={classes.App}>
      <Sidebar
        onBurgerMenuClick={toggleMenu}
        burgerMenuOpened={isMenuOpened}
        burgerButtonRef={sidebarButtonRef}
      />

      <div className={classes.content}>
        <Component {...pageProps} />

        <div className={classes.AppBurgerButton}>
          <BurgerButton
            onClick={toggleMenu}
            isOpened={isMenuOpened}
            ref={buttonRef}
          />
        </div>
      </div>

      <Menu
        isOpened={isMenuOpened}
        ref={menuRef}
        onClose={() => setIsMenuOpened(false)}
      />
      <AppToaster />
    </div>
  );
}
