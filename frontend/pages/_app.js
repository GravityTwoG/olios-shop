import React, { useEffect } from 'react';
import '@/src/styles/globals.css';
import '@/src/styles/theme.css';

import { checkAuthorizationFx } from '@/src/features/Auth/store';

import { Layout } from '@/src/ui/organisms/Layout/Layout';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // check if user is already authenticated
    checkAuthorizationFx();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
