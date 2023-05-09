import React, { ReactNode } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classes from './products-grid.module.sass';

type ProductsGridProps = {
  children: (ReactNode & { key: string })[];
};

export const ProductsGrid: React.FC<ProductsGridProps> = (props) => {
  return (
    <TransitionGroup className={classes['products-grid']}>
      {props.children &&
        props.children.map((item) => {
          return (
            <CSSTransition
              key={item.key}
              classNames={classes['grid-item']}
              timeout={300}
            >
              {item}
            </CSSTransition>
          );
        })}
    </TransitionGroup>
  );
};
