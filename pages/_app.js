import React, {useEffect} from "react";
import '../styles/reset.css';

import {checkAuthorizationFx} from "../features/Auth/store";

import {Layout} from '../ui/organisms/Layout/Layout';

export default function App({Component, pageProps}) {

  useEffect(() => {
    checkAuthorizationFx()
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
