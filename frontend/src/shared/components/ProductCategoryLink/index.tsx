import React from 'react';
import clsx from 'clsx';
import classes from './category.module.scss';

import useSWR from 'swr';

import { fetchCategory } from '../../api/product-categories';

import { paths } from '@/src/paths';
import { toast } from '../../toasts';
import { IProductCategory } from '@/src/types/IProductCategory';
import { ApiError } from '../../api';

import Image from 'next/image';
import { NavLink } from '@/src/ui/atoms/NavLink';

export type ProductCategoryLinkProps = {
  className?: string;
  categoryId: number;
  onClick?: () => void;
};

export const ProductCategoryLink = (props: ProductCategoryLinkProps) => {
  const { data: category } = useSWR<IProductCategory, ApiError>(
    `/api/product-categories/${props.categoryId}`,
    () => fetchCategory(props.categoryId),
    {
      onError(e) {
        toast.error(e.message);
      },
    },
  );

  return (
    <NavLink
      href={paths.home({}) + '?categoryId=' + props.categoryId}
      className={clsx(classes.category, props.className)}
      activeClassName={classes.active}
      onClick={props.onClick}
    >
      <span>{category ? category.name : 'Category name'}</span>
      <Image
        width={200}
        height={200}
        src={category ? category.iconUrl : 'https://via.placeholder.com/200'}
        alt={category ? category.name : 'Category icon'}
      />
    </NavLink>
  );
};
