import React, { ReactNode } from 'react';
import classes from './products-grid.module.sass';

type ProductsGridProps = {
  children: ReactNode;
};

export const ProductsGrid: React.FC<ProductsGridProps> = (props) => {
  return <div className={classes['products-grid']}>{props.children}</div>;
};
