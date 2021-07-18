import React from 'react';
import classes from './mainPage.module.css';

import Head from 'next/head';
import {StyledLink} from "../../components/atoms/StyledLink";

export function HomePage() {
  return (
    <div className={classes['MainPage']}>
      <Head>
        <title>Olios Shop | Home</title>
      </Head>

      <div className={classes['main-text']}>
        <div className={classes['main-text-title']}>OLIOS</div>
        <div className={classes['main-text-subtitle']}>
          NEWEST FURNITURE SHOP
        </div>
        <StyledLink href="/products">
          View more
        </StyledLink>
      </div>
    </div>
  );
}

export default HomePage