import React from 'react';
import classes from './about-page.module.sass';

export default function AboutPage() {
  return (
    <div className={classes['about-page']}>
      <div className={classes['about-page__title']}>About</div>
      <h2>Design</h2>
      <p>
        template from <a>www.symu.co</a>
      </p>
      <h2>Used libs</h2>
      <p>React</p>
      <p>Redux</p>
      <p>React-Redux</p>
      <p>Redux-thunk</p>
      <h2>Backend</h2>
      <p>Firebase Hosting + Realtime database + storage</p>
    </div>
  );
}
