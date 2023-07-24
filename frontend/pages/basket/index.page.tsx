import React, { useEffect } from 'react';
import classes from './basket.module.scss';

import { useUnit } from 'effector-react';
import { $cart, $isCartPending, pageMounted, removeFromCart } from './model';

import { paths } from '@/src/paths';

import { PrivatePage } from '@/src/features/Auth';

import Link from 'next/link';
import Image from 'next/image';
import { StyledLink } from '@/src/ui/atoms/StyledLink';
import { Preloader } from '@/src/ui/molecules/Preloader';

function Basket() {
  const [cart, isCartPending] = useUnit([$cart, $isCartPending]);

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <div className={classes['basket-page']}>
      <div className={classes['basket-page__title']}>Basket</div>
      <div className="my-4 flex justify-end items-center gap-6">
        Total: {cart.total}
        {cart.items.length > 0 && (
          <span>
            <StyledLink href={`${paths.ordersCreate({ cartId: cart.id })}`}>
              Order
            </StyledLink>
          </span>
        )}
      </div>

      <Preloader isLoading={isCartPending}>
        <ul>
          {cart.items.map((item) => {
            return (
              <li className={classes['basket-item']} key={item.id}>
                <Link
                  href={paths.product({ id: item.productId.toString() })}
                  className={classes['basket-item-thumb']}
                >
                  <Image
                    src={item.thumbUrl}
                    alt={item.productName}
                    width={150}
                    height={150}
                    className={classes['basket-item__img']}
                  />
                </Link>

                <div className={classes['basket-item__inner']}>
                  <Link
                    href={paths.product({ id: item.productId.toString() })}
                    className={classes['basket-item__name']}
                  >
                    {item.productName}
                  </Link>
                  <div className={classes['basket-item__quantity']}>
                    Qty: {item.quantity}
                  </div>
                  <div className={classes['basket-item__price']}>
                    {item.realPrice}
                  </div>
                  <button
                    className={classes['basket-item__delete']}
                    title="Remove from cart"
                    aria-label="Remove from cart"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Preloader>

      <div className={classes['order']} />
    </div>
  );
}

export default PrivatePage(Basket, []);
