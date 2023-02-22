import React from 'react';
import styles from './flex.module.scss';

const shorthands = [
  'fxww',
  'fxdc',
  'jcsb',
  'jcsa',
  'jcc',
  'jcfe',
  'jcfs',
  'aic',
  'aife',
  'aifs',
];

export type FlexProps = {
  fxww?: boolean;
  jcsb?: boolean;
  jcsa?: boolean;
  jcc?: boolean;
  jcfe?: boolean;
  jcfs?: boolean;
  aic?: boolean;
  aife?: boolean;
  aifs?: boolean;
  fxdc?: boolean;
  margin?: React.CSSProperties['margin'];
} & React.HTMLProps<HTMLDivElement>;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const classes: string[] = [];
    const {
      fxww,
      jcsb,
      jcsa,
      jcc,
      jcfe,
      jcfs,
      aic,
      aife,
      aifs,
      fxdc,
      className,
      ...otherProps
    } = props;

    const shProps: { [index: string]: boolean | undefined } = {
      fxww,
      jcsb,
      jcsa,
      jcc,
      jcfe,
      jcfs,
      aic,
      aife,
      aifs,
      fxdc,
    };
    shorthands.forEach((s) => {
      if (shProps[s]) {
        classes.push(styles[s]);
      }
    });

    const actualClass: string = className ? className : '';

    return (
      <div
        {...otherProps}
        style={{
          ...otherProps,
          margin: props.margin,
        }}
        ref={ref}
        className={classes.join(' ') + ' ' + actualClass + ' ' + styles.flex}
      />
    );
  },
);
