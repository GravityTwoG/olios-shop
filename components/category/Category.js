import React from 'react';
import classes from './category.module.sass';
import { NavLink } from '../NavLink';

function Category(props) {
  return (
    <NavLink
      href={props.href}
      className={`${classes.category} ${props.className || ''}`}
      activeClassName={classes.active}
    >
      <span>{props.name}</span>
      <p>{props.children}</p>
    </NavLink>
  );
}

export default Category;
