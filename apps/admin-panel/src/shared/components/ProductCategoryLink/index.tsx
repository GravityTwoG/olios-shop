import React from 'react';
import clsx from 'clsx';
import classes from './category.module.scss';

import { paths } from '@olios-shop/admin/config/paths';
import { IProductCategory } from '@olios-shop/admin/types/IProductCategory';

import { NavLink } from '@olios-shop/admin/ui/atoms/NavLink';

export type ProductCategoryLinkProps = {
  className?: string;
  category: IProductCategory;
  onClick?: () => void;
};

export const ProductCategoryLink = (props: ProductCategoryLinkProps) => {
  return (
    <NavLink
      href={paths.home({}) + '?categoryId=' + props.category.id}
      className={clsx(classes.category, props.className)}
      activeClassName={classes.active}
      onClick={props.onClick}
    >
      <span>{props.category.name}</span>
      <img src={props.category.iconUrl} alt={props.category.name} />
    </NavLink>
  );
};
