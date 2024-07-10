import React, { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import clsx from 'clsx';
import classes from './product-page.module.scss';

import { allSettled, serialize, fork } from 'effector';
import { useUnit } from 'effector-react';
import {
  $cartItem,
  $isProductInCartPending,
  $product,
  $productNotFound,
  $recommendedProducts,
  addToCart,
  amountInCartChanged,
  pageStarted,
  productChanged,
  removeFromCart,
} from './model';

import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { ImageViewer } from '@olios-shop/ui/atoms/ImageViewer';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { ProductCategoryLinkLoader } from '@olios-shop/storefront/shared/components/ProductCategoryLinkLoader';
import { ProductCard } from '@olios-shop/storefront/features/Product/components/molecules/productCard/ProductCard';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const scope = fork();

  await allSettled(pageStarted, {
    scope,
    params: {
      productId: Number(ctx.query.productId),
      cookie: ctx.req.headers.cookie || '',
    },
  });

  if (scope.getState($productNotFound)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      values: serialize(scope),
    },
  };
};

export default function ProductPageContainer() {
  const [product, cartItem, recommendedProducts, isProductInCartPending] =
    useUnit([
      $product,
      $cartItem,
      $recommendedProducts,
      $isProductInCartPending,
    ]);

  const [
    addToCartEvent,
    amountInCartChangedEvent,
    removeFromCartEvent,
    productChangedEvent,
  ] = useUnit([addToCart, amountInCartChanged, removeFromCart, productChanged]);

  useEffect(() => {
    productChangedEvent();
  }, [product, productChangedEvent]);

  return (
    <div className={classes['product']}>
      <MetaTags
        title={product.name}
        description={product.description}
        imageURL={product.images[0]}
        price={{ amount: product.realPrice, currency: 'USD' }}
      />

      <div className={classes['product__preview']}>
        <ImageViewer images={product.images.map((i) => ({ src: i }))} />
        <div className={classes['product__preview-like']}>
          <span>409</span> ❤
        </div>
      </div>

      <div className={classes['product__right']}>
        <div className={classes['product__right-inner']}>
          <div className={classes['product__header']}>
            <ProductCategoryLinkLoader categoryId={product.categoryId} />
          </div>

          <div className={classes['product__info']}>
            <p className={classes['product__name']}>{product.name}</p>

            <p className={classes['product__desc']}>{product.description}</p>

            <div className={classes['product__line']}>
              <div className={classes['product__price']}>
                <div className={classes['product__price-label']}>Cost</div>
                <span>
                  <span className={classes['product__price-curr']}>
                    <MonetaryValue value={product.realPrice} />
                  </span>
                  {product.oldPrice !== product.realPrice && (
                    <span className={classes['product__price-prev']}>
                      <MonetaryValue value={product.oldPrice} />
                    </span>
                  )}
                </span>
              </div>

              <div className={classes['product__quantity']}>
                <div className={classes['product__quantity-label']}>
                  Quantity
                </div>

                <input
                  className={classes['product__quantity-input']}
                  type="number"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    amountInCartChangedEvent(Number(e.target.value))
                  }
                  min="1"
                  disabled={cartItem.isInCart}
                />

                {cartItem.isInCart ? (
                  <CTAButton
                    color="primary"
                    onClick={() => removeFromCartEvent()}
                    isLoading={isProductInCartPending}
                  >
                    Remove
                  </CTAButton>
                ) : (
                  <CTAButton
                    color="primary"
                    onClick={() => addToCartEvent()}
                    isLoading={isProductInCartPending}
                  >
                    Add to cart
                  </CTAButton>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={clsx(classes['product__recomended'], 'custom-scrollbar')}
          key={product.id}
        >
          <div className={classes['product__recomended-title']}>
            Recommended
          </div>

          <div className={classes['product__recomended-cont']}>
            {recommendedProducts.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                className="w-[260px] flex-grow-0 flex-shrink-0"
              />
            ))}
            <div className="w-[1px] h-[1rem] flex-shrink-0 flex-grow-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
