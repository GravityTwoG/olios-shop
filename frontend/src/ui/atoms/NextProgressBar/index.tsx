import { memo, useEffect, useState } from 'react';
import classes from './next-progress-bar.module.scss';

import { Skeleton } from '@/src/ui/atoms/Skeleton';

import Router from 'next/router';
import clsx from 'clsx';

export const NextProgressBar = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const routeChangeStart = () => {
      setIsLoading(true);
    };

    const routeChangeEnd = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    const routeChangeError = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeError);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeError);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={clsx(classes.NextProgressBar, classes.isLoading)}>
        <Skeleton
          containerClassName={classes.SkeletonContainer}
          className={classes.Skeleton}
        />
      </div>
    );
  }

  return null;
});
