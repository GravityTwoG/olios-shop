import React, { useEffect, useRef, useState, ReactNode } from 'react';
import classes from './_app.module.scss';
import '@/src/styles/globals.css';
import '@/src/styles/theme.css';
import '@/src/styles/ui.scss';

import { AppProps } from 'next/app';
import { EffectorNext } from '@effector/next';

import { useUnit } from 'effector-react';
import { appStarted } from '@/src/shared/session';

import { useOnClickOutside } from '@/src/ui/hooks/useOnClickOutside';

import { BurgerButton } from '@/src/ui/molecules/BurgerButton';
import { Menu } from '@/src/shared/components/Menu';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { AppToaster } from '@/src/shared/toasts';

const App = ({ children }: { children: ReactNode }) => {
  const [appStartedEvent] = useUnit([appStarted]);

  useEffect(() => {
    appStartedEvent();
  }, [appStartedEvent]);

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
        {children}

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
};

type PageProps = { values: Record<string, unknown> };

export default function AppWrapper<T extends PageProps>({
  Component,
  pageProps,
}: AppProps<T>) {
  return (
    <EffectorNext values={pageProps.values}>
      <App>
        <Component {...pageProps} />
      </App>
    </EffectorNext>
  );
}
