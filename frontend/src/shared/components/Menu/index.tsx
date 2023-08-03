import React from 'react';
import clsx from 'clsx';
import classes from './menu.module.scss';

import useSWR from 'swr';

import { IProductCategory } from '@/src/types/IProductCategory';
import { ApiError } from '@/src/shared/api';
import { ListDTO } from '@/src/shared/api/lib';
import { fetchCategories } from '@/src/shared/api/product-categories';
import { toast } from '@/src/shared/toasts';

import { paths } from '@/src/paths';

import { NavLink } from '../../../ui/atoms/NavLink';
import { ProductCategoryLink } from '@/src/shared/components/ProductCategoryLink';
import { ProductCategoryLinkSkeleton } from '../ProductCategoryLinkLoader';

const fetchCategoriesSWR = () => fetchCategories({ take: 8, skip: 0 });

export type MenuProps = {
  isOpened: boolean;
  className?: string;
  onClose: () => void;
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    const { data: categories } = useSWR<ListDTO<IProductCategory>, ApiError>(
      '/api/product-categories',
      fetchCategoriesSWR,
      {
        onError: (e) => {
          toast.error(e.message);
        },
      },
    );

    return (
      <div
        ref={ref}
        className={clsx(
          classes.Menu,
          props.className,
          props.isOpened && classes['Menu--active'],
        )}
      >
        <div className={classes.categories}>
          {categories === undefined && <ProductCategoryLinksSkeleton />}

          {categories !== undefined &&
            categories.list.map((category) => (
              <ProductCategoryLink
                key={category.id}
                category={category}
                onClick={props.onClose}
              />
            ))}
        </div>

        <NavLink href={paths.home({})} className={classes.showAll}>
          Show All Categories
        </NavLink>
      </div>
    );
  },
);

const ProductCategoryLinksSkeleton = () => {
  return (
    <>
      <ProductCategoryLinkSkeleton />
      <ProductCategoryLinkSkeleton />
      <ProductCategoryLinkSkeleton />
      <ProductCategoryLinkSkeleton />
      <ProductCategoryLinkSkeleton />
      <ProductCategoryLinkSkeleton />
    </>
  );
};
