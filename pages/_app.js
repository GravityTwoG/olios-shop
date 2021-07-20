import '../styles/reset.css';
import {Layout} from '../ui/organisms/Layout/Layout';
import React from "react";

export default function App({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
