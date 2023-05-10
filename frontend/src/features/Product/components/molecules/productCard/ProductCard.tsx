import React from 'react';
import classes from './product-card.module.sass';

import { paths } from '@/src/paths';
import { IProduct } from '../../../store';

import Link from 'next/link';

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link
      href={paths.product({ id: product.id.toString() })}
      className={classes['product-card']}
    >
      <div className={classes['product-card__inner']}>
        <React.Fragment>
          <div className={classes['product-card__photo']}>
            <img src={product.thumbUrl} alt="" />
          </div>
          <div className={classes['product-card__info']}>
            <div className={classes['product-card__name']}>{product.name}</div>
            <div className={classes['product-card__desc']}>
              {product.description}
            </div>
            <div className={classes['product-card__price']}>
              {product.realPrice}
            </div>
          </div>
        </React.Fragment>
      </div>
    </Link>
  );
}
