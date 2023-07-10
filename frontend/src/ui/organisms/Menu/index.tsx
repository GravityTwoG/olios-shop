import React from 'react';
import classes from './menu.module.scss';

import { NavLink } from '../../atoms/NavLink';
import Category from '../../molecules/Category';
import { paths } from '@/src/paths';

function Categories() {
  return (
    <div className={classes.categories}>
      <Category name="Living room" href={paths.home({}) + '?categoryId=' + 1}>
        <img src="/category-icons/Living-room.png" alt="" />
      </Category>
      <Category name="Office" href={paths.home({}) + '?categoryId=' + 2}>
        <img src="/category-icons/Office.png" alt="" />
      </Category>
      <Category name="For kids" href={paths.home({}) + '?categoryId=' + 3}>
        <img src="/category-icons/For-kids.png" alt="" />
      </Category>
      <Category name="Kitchen" href={paths.home({}) + '?categoryId=' + 4}>
        <img src="/category-icons/Kitchen.png" alt="" />
      </Category>
      <Category name="Accessories" href={paths.home({}) + '?categoryId=' + 5}>
        <img src="/category-icons/Accessories.png" alt="" />
      </Category>
    </div>
  );
}

export type MenuProps = {
  isOpened: boolean;
  className?: string;
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className={
          props.isOpened
            ? `${classes.Menu} ${classes['Menu--active']} ${props.className}`
            : `${classes.Menu} ${props.className}`
        }
      >
        <Categories />

        <NavLink href={paths.home({})} className={classes.showAll}>
          Show All Categories
        </NavLink>
      </div>
    );
  },
);
