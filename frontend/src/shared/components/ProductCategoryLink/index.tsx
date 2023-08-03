import React from 'react';
import clsx from 'clsx';
import classes from './category.module.scss';

import { paths } from '@/src/paths';
import { IProductCategory } from '@/src/types/IProductCategory';

import Image from 'next/image';
import { NavLink } from '@/src/ui/atoms/NavLink';

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
      <Image
        width={200}
        height={200}
        src={props.category.iconUrl}
        alt={props.category.name}
      />
    </NavLink>
  );
};
