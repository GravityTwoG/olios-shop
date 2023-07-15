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

import { NavLink } from '../../atoms/NavLink';
import { ProductCategoryLink } from '@/src/shared/components/ProductCategoryLink';

const fetchCategoriesSWR = () => fetchCategories({ take: 8, skip: 0 });

export type MenuProps = {
  isOpened: boolean;
  className?: string;
  onClose: () => void;
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    const { data } = useSWR<ListDTO<IProductCategory>, ApiError>(
      '/api/product-categories',
      fetchCategoriesSWR,
      {
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
          {categories.map((category) => (
            <ProductCategoryLink
              key={category.id}
              categoryId={category.id}
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
