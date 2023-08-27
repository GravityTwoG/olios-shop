import React, { useEffect } from 'react';
import classes from './product-page.module.scss';
import { GetServerSidePropsContext } from 'next';

import { allSettled, serialize, fork } from 'effector';
import { useUnit } from 'effector-react';
import {
  $areRecommendedProductsPending,
  $cartItem,
  $isProductInCartPending,
  $isProductPending,
  $product,
  $recommendedProducts,
  addToCart,
  amountInCartChanged,
  pageMounted,
  pageStarted,
  removeFromCart,
} from './model';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageViewer } from '@/src/ui/atoms/ImageViewer';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';
import { ProductCategoryLinkLoader } from '@/src/shared/components/ProductCategoryLinkLoader';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const scope = fork();

  await allSettled(pageStarted, {
    scope,
    params: Number(ctx.query.productId),
  });

  return {
    props: {
      values: serialize(scope),
    },
  };
};

export default function ProductPageContainer() {
  const [
    product,
    cartItem,
    recommendedProducts,
    isProductPending,
    isProductInCartPending,
    areRecommendedProductsPending,
  ] = useUnit([
    $product,
    $cartItem,
    $recommendedProducts,
    $isProductPending,
    $isProductInCartPending,
    $areRecommendedProductsPending,
  ]);

  const [
    addToCartEvent,
    amountInCartChangedEvent,
    removeFromCartEvent,
    pageMountedEvent,
  ] = useUnit([addToCart, amountInCartChanged, removeFromCart, pageMounted]);

  useEffect(() => {
    pageMountedEvent();
  }, [pageMountedEvent]);

  return (
    <div className={classes['product']}>
      <div className={classes['product__preview']}>
        <ImageViewer
          images={product.images.map((i) => ({ src: i }))}
          isLoading={isProductPending}
        />
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

        <div className={classes['product__recomended']}>
          <div className={classes['product__recomended-title']}>Recomended</div>

          <Preloader isLoading={areRecommendedProductsPending}>
            <div className={classes['product__recomended-cont']}>
              {recommendedProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  className="max-w-[320px]"
                />
              ))}
            </div>
          </Preloader>
        </div>
      </div>
    </div>
  );
}
