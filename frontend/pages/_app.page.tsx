import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import '@/src/styles/globals.css';
import '@/src/styles/theme.css';

import { fetchSessionFx } from '@/src/shared/session';

import { Layout } from '@/src/ui/organisms/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // check if user is already authenticated
    fetchSessionFx();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
