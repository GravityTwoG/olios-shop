import React, { useEffect, useRef, useState, ReactNode } from 'react';
import classes from './_app.module.scss';

import '@olios-shop/storefront/styles/globals.css';
import '@olios-shop/ui/theme.css';

import { AppProps } from 'next/app';
import { EffectorNext } from '@effector/next';

import { useUnit } from 'effector-react';
import {
  $authStatus,
  $user,
  AuthStatus,
  SessionUserRole,
  appStarted,
  logout,
} from '@olios-shop/storefront/shared/session';

import { useOnClickOutside } from '@olios-shop/ui/hooks/useOnClickOutside';

import { AppErrorBoundary } from '@olios-shop/ui/molecules/AppErrorBoundary';
import { BurgerButton } from '@olios-shop/ui/molecules/BurgerButton';
import { NextProgressBar } from '@olios-shop/storefront/ui/atoms/NextProgressBar';
import { Menu } from '@olios-shop/storefront/shared/components/Menu';
import { Sidebar } from '@olios-shop/storefront/shared/components/Sidebar';
import { AppToaster } from '@olios-shop/storefront/shared/toasts';
import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import clsx from 'clsx';

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

  const [user, authStatus, logoutEvent] = useUnit([$user, $authStatus, logout]);

  if (
    authStatus === AuthStatus.Authenticated &&
    user.role !== SessionUserRole.CUSTOMER
  ) {
    return (
      <div
        className={clsx(
          classes.App,
          'flex flex-col justify-center items-center',
        )}
      >
        <div className="p-8 max-w-[768px]">
          <H1 className="mb-8">Only customers can access this page</H1>

          <CTAButton color="secondary" onClick={() => logoutEvent()}>
            Logout
          </CTAButton>
        </div>
      </div>
    );
  }

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
