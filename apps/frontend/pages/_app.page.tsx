import React, { useEffect, useRef, useState, ReactNode } from 'react';
import classes from './_app.module.scss';

import '@olios-shop/frontend/styles/globals.css';
import '@olios-shop/ui/theme.css';

import { AppProps } from 'next/app';
import { EffectorNext } from '@effector/next';

import { useUnit } from 'effector-react';
import { appStarted } from '@olios-shop/frontend/shared/session';

import { useOnClickOutside } from '@olios-shop/ui/hooks/useOnClickOutside';

import { AppErrorBoundary } from '@olios-shop/ui/molecules/AppErrorBoundary';
import { BurgerButton } from '@olios-shop/ui/molecules/BurgerButton';
import { NextProgressBar } from '@olios-shop/frontend/ui/atoms/NextProgressBar';
import { Menu } from '@olios-shop/frontend/shared/components/Menu';
import { Sidebar } from '@olios-shop/frontend/shared/components/Sidebar';
import { AppToaster } from '@olios-shop/frontend/shared/toasts';

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
      <NextProgressBar />

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
    <AppErrorBoundary>
      <EffectorNext values={pageProps.values}>
        <App>
          <Component {...pageProps} />
        </App>
      </EffectorNext>
    </AppErrorBoundary>
  );
}
