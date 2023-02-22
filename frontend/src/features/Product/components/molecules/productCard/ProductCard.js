import React from 'react';
import Link from 'next/link';
import classes from './product-card.module.sass';

export function ProductCard({product}) {
  return (
    <Link href={`/product/${product.id}`}>
      <a className={classes['product-card']}>
          <div className={classes['product-card__inner']}>
            <React.Fragment>
              <div className={classes['product-card__photo']}>
                <img src={product.imgUrl} alt="" />
              </div>
              <div className={classes['product-card__info']}>
                <div className={classes['product-card__name']}>{product.name}</div>
                <div className={classes['product-card__desc']}>{product.desc}</div>
                <div className={classes['product-card__price']}>{product.price}</div>
              </div>
            </React.Fragment>
          </div>
      </a>
    </Link>
  );
}
