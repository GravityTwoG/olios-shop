import React from 'react';
import clsx from 'clsx';
import classes from './product-card.module.scss';

import { paths } from '@olios-shop/frontend/paths';
import { IProduct } from '@olios-shop/frontend/types/IProduct';

import Link from 'next/link';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { ProductCardImage } from './ProductCardImage';

export type ProductCartProps = {
  product: IProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCartProps) {
  const productLink = paths.product({ id: product.id.toString() });

  return (
    <div className={clsx(classes['product-card'], className)}>
      <div className={classes['product-card__photo']}>
        <ProductCardImage
          images={product.images.map((url) => ({
            src: url,
          }))}
          link={productLink}
        />
      </div>

      <Link href={productLink} className={classes['product-card__info']}>
        <p className={classes['product-card__name']}>{product.name}</p>

        <p className={classes['product-card__desc']}>{product.description}</p>

        <div className={classes['product-card__price']}>
          <MonetaryValue value={product.realPrice} />
        </div>
      </Link>
    </div>
  );
}
