import { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { router } from './router';
import { appStarted } from '../shared/session';

import { RouterProvider } from 'react-router-dom';
import { AppErrorBoundary } from '@olios-shop/ui/molecules/AppErrorBoundary';

export function App() {
  const [appStartedEvent] = useUnit([appStarted]);

  useEffect(() => {
    appStartedEvent();
  }, [appStartedEvent]);

  return (
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  );
}
