import React, { ReactNode } from 'react';
import classes from './products-grid.module.scss';

type ProductsGridProps = {
  children: ReactNode;
};

export const ProductsGrid: React.FC<ProductsGridProps> = (props) => {
  return <div className={classes['products-grid']}>{props.children}</div>;
};
