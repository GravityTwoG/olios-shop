import React from 'react';
import clsx from 'clsx';
import classes from './menu.module.scss';

import useSWR from 'swr';

import { IProductCategory } from '@olios-shop/frontend/types/IProductCategory';
import { ApiError } from '@olios-shop/frontend/shared/api';
import { ListDTO } from '@olios-shop/frontend/shared/api/lib';
import { fetchCategories } from '@olios-shop/frontend/shared/api/product-categories';
import { toast } from '@olios-shop/frontend/shared/toasts';

import { ProductCategoryLink } from '@olios-shop/frontend/shared/components/ProductCategoryLink';
import { ProductCategoryLinkSkeleton } from '../ProductCategoryLinkLoader';

const fetchCategoriesSWR = () =>
  fetchCategories({ take: 8, skip: 0, parentId: null });

export type MenuProps = {
  isOpened: boolean;
  className?: string;
  onClose: () => void;
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    const { data, isLoading } = useSWR<ListDTO<IProductCategory>, ApiError>(
      '/api/product-categories',
      fetchCategoriesSWR,
      {
        errorRetryInterval: 30000,
        onError: (e) => {
          toast.error(e.message);
        },
      },
    );

    const categories = data ? data.list : [];

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
          {isLoading && <ProductCategoryLinksSkeleton />}

          {categories !== undefined &&
            categories.map((category) => (
              <ProductCategoryLink
                key={category.id}
                category={category}
                onClick={props.onClose}
              />
            ))}
        </div>
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
