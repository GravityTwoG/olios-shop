import React, { useEffect } from 'react';
import classes from './cart.module.scss';
import clsx from 'clsx';

import { useForm } from 'react-hook-form';

import { useUnit } from 'effector-react';
import {
  $cart,
  $carts,
  $isCartPending,
  $isNewCartCreating,
  cartCreated,
  cartDeleted,
  loadCart,
  newCartFormSubmitted,
  pageMounted,
  removeFromCart,
  selectedAsDefault,
} from './model';

import { SessionUserRole } from '@/src/shared/session';

import { paths } from '@/src/paths';

import { PrivatePage } from '@/src/features/Auth';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/src/ui/atoms/Button';
import { H1 } from '@/src/ui/atoms/Typography';
import { StyledLink } from '@/src/ui/atoms/StyledLink';
import { Container } from '@/src/ui/atoms/Container';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { FormError } from '@/src/ui/molecules/Form';
import { RoleGuard } from '@/src/shared/components/RoleGuard';
import { MetaTags } from '@/src/shared/components/MetaTags';

function CartPage() {
  const [cart, isCartPending] = useUnit([$cart, $isCartPending]);
  const [
    pageMountedEvent,
    selectedAsDefaultEvent,
    cartDeletedEvent,
    removedFromCartEvent,
  ] = useUnit([pageMounted, selectedAsDefault, cartDeleted, removeFromCart]);

  useEffect(() => {
    pageMountedEvent();
  }, [pageMountedEvent]);

  return (
    <Container className={clsx(classes['basket-page'], 'my-8')}>
      <MetaTags title="Cart" />

      <H1>Cart</H1>

      <CartsList />

      <div className="mt-8 mb-4 flex flex-wrap justify-between items-center gap-6">
        <div className="flex gap-2">
          <RoleGuard roles={SessionUserRole.CUSTOMER}>
            {!cart.isDefault && (
              <Button
                color="secondary"
                onClick={() => selectedAsDefaultEvent()}
              >
                Select as default
              </Button>
            )}

            {!cart.isDefault && (
              <Button color="danger" onClick={() => cartDeletedEvent()}>
                Delete cart
              </Button>
            )}
          </RoleGuard>
        </div>

        <div>
          Total: <MonetaryValue value={cart.total} />
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
                    Price: <MonetaryValue value={item.realPrice} />
                  </div>
                  <button
                    className={classes['basket-item__delete']}
                    title="Remove from cart"
                    aria-label="Remove from cart"
                    onClick={() => {
                      removedFromCartEvent(item.id);
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
  const [carts, selectedCart, isNewCartCreating] = useUnit([
    $carts,
    $cart,
    $isNewCartCreating,
  ]);

  const [loadCartEvent, newCartFormSubmittedEvent] = useUnit([
    loadCart,
    newCartFormSubmitted,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    newCartFormSubmittedEvent(data.name);
  });

  useEffect(() => {
    return cartCreated.watch(() => {
      reset();
    });
  }, [reset]);

  return (
    <div className={clsx('mx-[-0.75rem]', classes.CartsList)}>
      <ul className="px-[0.75rem] flex items-stretch gap-4 py-3 overflow-auto snap-x scroll-pl-[0.75rem] custom-scrollbar">
        {carts.map((c) => (
          <li key={c.id} className="snap-start flex-none">
            <button
              className={clsx(
                'bg-white py-3 px-4 cursor-pointer h-full w-[170px]',
                c.id === selectedCart.id && 'border-[1px] border-slate-950',
              )}
              onClick={() => loadCartEvent(c.id)}
            >
              <p>{c.name}</p>
              <p className="text-xs">{c.isDefault ? 'Default' : ''}</p>
            </button>
          </li>
        ))}

        <RoleGuard roles={SessionUserRole.CUSTOMER}>
          <li className="bg-white py-3 px-4 w-[170px] snap-start">
            <form onSubmit={onSubmit}>
              <p className="mb-2">
                <input
                  className="border-slate-950 border-[1px] px-2 py-1 w-full"
                  placeholder="Cart name"
                  {...register('name', { required: 'Enter name!' })}
                />
              </p>
              <FormError>{errors.name?.message}</FormError>

              <Button
                className="w-full"
                type="submit"
                isLoading={isNewCartCreating}
              >
                Create new cart
              </Button>
            </form>
          </li>
        </RoleGuard>
      </ul>
    </div>
  );
};

export default PrivatePage(CartPage, [
  SessionUserRole.ANONYMOUS,
  SessionUserRole.CUSTOMER,
]);
