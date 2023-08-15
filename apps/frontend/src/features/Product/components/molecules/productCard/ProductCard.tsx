import React from 'react';
import classes from './product-card.module.scss';

import { paths } from '@/src/paths';
import { IProduct } from '@/src/types/IProduct';

import Link from 'next/link';
import { ProductCardImage } from './ProductCardImage';
import clsx from 'clsx';

export type ProductCartProps = {
  product: IProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCartProps) {
  return (
    <div className={clsx(classes['product-card'], className)}>
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
        <p className={classes['product-card__name']}>{product.name}</p>

        <p className={classes['product-card__desc']}>{product.description}</p>

        <div className={classes['product-card__price']}>
          ${product.realPrice}
        </div>
      </Link>
    </div>
  );
}
