import React from 'react';
import classes from './menu.module.scss';

import Category from '../category/Category';
import LivingRoomIcon from '../../src/images/category-icons/Living-room.png';
import OfficeIcon from '../../src/images/category-icons/Office.png';
import ForKidsIcon from '../../src/images/category-icons/For-kids.png';
import KitchenIcon from '../../src/images/category-icons/Kitchen.png';
import AccesoriesIcon from '../../src/images/category-icons/Accesories.png';
import { NavLink } from '../NavLink';

function Categories() {
  return (
    <div className={classes.categories}>
      <Category name="Living room" href="/products/living-room">
        <img src={LivingRoomIcon} alt="" />
      </Category>
      <Category name="Office" href="/products/office">
        <img src={OfficeIcon} alt="" />
      </Category>
      <Category name="For kids" href="/products/for-kids">
        <img src={ForKidsIcon} alt="" />
      </Category>
      <Category name="Kitchen" href="/products/kitchen">
        <img src={KitchenIcon} alt="" />
      </Category>
      <Category name="Accesories" href="/products/accesories">
        <img src={AccesoriesIcon} alt="" />
      </Category>
    </div>
  );
}

export const Menu = React.forwardRef((props, ref) => {
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
