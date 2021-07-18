import '../styles/reset.css';
import { Layout } from '../components/organisms/Layout/Layout';
import React from "react";

export default function App({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
