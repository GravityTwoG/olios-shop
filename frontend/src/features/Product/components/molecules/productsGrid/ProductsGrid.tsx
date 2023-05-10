import React, { ReactNode } from 'react';
import classes from './products-grid.module.sass';

type ProductsGridProps = {
  children: (ReactNode & { key: string })[];
};

export const ProductsGrid: React.FC<ProductsGridProps> = (props) => {
  return (
    <div className={classes['products-grid']}>
      {props.children &&
        props.children.map((item) => {
          return (
            <div key={item.key} className={classes['grid-item']}>
              {item}
            </div>
          );
        })}
    </div>
  );
};
