import React from 'react';
import classes from './menu.module.scss';

import { NavLink } from '../../atoms/NavLink';
import Category from '../../molecules/Category';

function Categories() {
  return (
    <div className={classes.categories}>
      <Category name="Living room" href="/products/living-room">
        <img src="/category-icons/Living-room.png" alt="" />
      </Category>
      <Category name="Office" href="/products/office">
        <img src="/category-icons/Office.png" alt="" />
      </Category>
      <Category name="For kids" href="/products/for-kids">
        <img src="/category-icons/For-kids.png" alt="" />
      </Category>
      <Category name="Kitchen" href="/products/kitchen">
        <img src="/category-icons/Kitchen.png" alt="" />
      </Category>
      <Category name="Accessories" href="/products/accessories">
        <img src="/category-icons/Accessories.png" alt="" />
      </Category>
    </div>
  );
}

export type MenuProps = {
  isOpened: boolean;
  className?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
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

      <NavLink href="/products" className={classes.showAll}>
        Show All Categories
      </NavLink>
    </div>
  );
});
