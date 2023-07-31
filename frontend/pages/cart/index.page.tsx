import React, { useEffect } from 'react';
import classes from './cart.module.scss';
import clsx from 'clsx';

import { useUnit } from 'effector-react';
import {
  $cart,
  $carts,
  $isCartPending,
  $newCartName,
  cartDeleted,
  loadCart,
  newCartFormSubmitted,
  newCartNameChanged,
  pageMounted,
  removeFromCart,
  selectedAsDefault,
} from './model';

import { IUserRole } from '@/src/types/IUser';

import { paths } from '@/src/paths';

import { PrivatePage } from '@/src/features/Auth';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/src/ui/atoms/Button';
import { StyledLink } from '@/src/ui/atoms/StyledLink';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { Form } from '@/src/ui/molecules/Form';
import { Container } from '@/src/ui/atoms/Container';

function CartPage() {
  const [cart, isCartPending] = useUnit([$cart, $isCartPending]);

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <Container className={clsx(classes['basket-page'], 'my-8')}>
      <div className={classes['basket-page__title']}>Basket</div>

      <CartsList />

      <div className="mt-8 mb-4 flex justify-between items-center gap-6">
        <div className="flex gap-2">
          {!cart.isDefault && (
            <Button color="secondary" onClick={() => selectedAsDefault()}>
              Select as default
            </Button>
          )}

          {!cart.isDefault && (
            <Button color="danger" onClick={() => cartDeleted()}>
              Delete cart
            </Button>
          )}
        </div>

        <div>
          Total: {cart.total}
          {cart.items.length > 0 && (
            <span className="ml-4">
              <StyledLink href={`${paths.ordersCreate({ cartId: cart.id })}`}>
                Order
              </StyledLink>
            </span>
          )}
        </div>
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
    </Container>
  );
}

const CartsList = () => {
  const [carts, selectedCart, newCartName] = useUnit([
    $carts,
    $cart,
    $newCartName,
  ]);

  return (
    <div className={clsx('mx-[-0.75rem]', classes.CartsList)}>
      <ul className="px-[0.75rem] flex items-stretch gap-4 py-3 overflow-auto snap-x scroll-pl-[0.75rem]">
        {carts.map((c) => (
          <li
            key={c.id}
            className={clsx(
              'bg-white py-3 px-4 cursor-pointer w-[170px] flex-none snap-start',
              c.id === selectedCart.id && 'border-[1px] border-slate-950',
            )}
            onClick={() => loadCart(c.id)}
          >
            <p>{c.name}</p>
            <p className="text-xs">{c.isDefault ? 'Default' : ''}</p>
          </li>
        ))}

        <li className="bg-white py-3 px-4 w-[170px] snap-start">
          <Form onSubmit={() => newCartFormSubmitted()}>
            <p className="mb-2">
              <input
                className="border-slate-950 border-[1px] px-2 py-1 w-full"
                value={newCartName}
                placeholder="cart name"
                onChange={(e) => newCartNameChanged(e.target.value)}
              />
            </p>
            <Button className="w-full" type="submit">
              Create new cart
            </Button>
          </Form>
        </li>
      </ul>
    </div>
  );
};

export default PrivatePage(CartPage, [IUserRole.CUSTOMER]);
