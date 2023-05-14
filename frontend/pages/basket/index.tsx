import React from 'react';

import classes from './basket.module.sass';
import { IProduct } from '@/src/types/IProduct';

import Link from 'next/link';
import Image from 'next/image';
import { PrivatePage } from '@/src/PrivatePage';
import { paths } from '@/src/paths';

function Basket() {
  const products: (IProduct & { quantity: number })[] = [];

  const renderProducts = () => {
    if (products) {
      return products.map((product) => {
        return (
          <div className={classes['basket-item']} key={product.id}>
            <Image
              src={product.thumbUrl}
              alt={product.name}
              className={classes['basket-item__img']}
            />
            <div className="basket-item__inner">
              <Link
                href={paths.product({ id: product.id.toString() })}
                className={classes['basket-item__name']}
              >
                {product.name}
              </Link>
              <div className={classes['basket-item__quantity']}>
                Qty: {product.quantity}
              </div>
              <div className={classes['basket-item__price']}>
                {product.realPrice}
              </div>
              <button
                className={classes['basket-item__delete']}
                onClick={() => {
                  // props.deleteItem(product.productId);
                }}
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={classes['basket-page']}>
      <div className={classes['basket-page__title']}>Basket</div>
      <div className={classes['basket']}>{renderProducts()}</div>
      <div className={classes['order']} />
    </div>
  );
}

export default PrivatePage(Basket);
