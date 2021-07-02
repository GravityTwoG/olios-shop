import React from 'react';
import styles from './mainPage.module.css';

import Head from 'next/head';
import { Button } from '../../components/Button/Button';

export function HomePage() {
  return (
    <div className={styles['MainPage']}>
      <Head>
        <title>Olios Shop</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="/LOGO.png" />
      </Head>

      <div className={styles['main-text']}>
        <div className={styles['main-text-title']}>OLIOS</div>
        <div className={styles['main-text-subtitle']}>
          NEWEST FURNITURE SHOP
        </div>
        <Button href="/products" isLink>
          View more
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
