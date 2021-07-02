import React from 'react';
import Link from 'next/link';
import classes from './product-card.module.sass';

function ProductCard(props) {
  return (
    <div className={classes['product-card']}>
      <Link to={props.href} className={classes['product-card__inner']}>
        <div className={classes['product-card__photo']}>
          <img src={props.img} alt="" />
        </div>
        <div className={classes['product-card__info']}>
          <div className={classes['product-card__name']}>{props.name}</div>
          <div className={classes['product-card__desc']}>{props.desc}</div>
          <div className={classes['product-card__price']}>{props.price}</div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
