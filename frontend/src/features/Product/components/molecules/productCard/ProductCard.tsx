import React from 'react';
import classes from './product-card.module.scss';

import { paths } from '@/src/paths';
import { IProduct } from '@/src/types/IProduct';

import Link from 'next/link';
import { ProductCardImage } from './ProductCardImage';

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className={classes['product-card']}>
      <div className={classes['product-card__inner']}>
        <div className={classes['product-card__photo']}>
          <ProductCardImage
            images={product.images.map((url) => ({
              src: url,
            }))}
          />
        </div>

        <Link
          href={paths.product({ id: product.id.toString() })}
          className={classes['product-card__info']}
        >
          <div className={classes['product-card__name']}>{product.name}</div>
          <div className={classes['product-card__desc']}>
            {product.description}
          </div>
          <div className={classes['product-card__price']}>
            {product.realPrice}
          </div>
        </Link>
      </div>
    </div>
  );
}
