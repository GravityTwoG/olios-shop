import React, { useEffect } from 'react';
import '@/src/styles/reset.css';
import '@/src/styles/theme.css';

import { checkAuthorizationFx } from '@/src/features/Auth/store';

import { Layout } from '@/src/ui/organisms/Layout/Layout';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    checkAuthorizationFx();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
