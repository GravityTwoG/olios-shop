import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './product-page.module.scss';

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
  removeFromCart,
} from './model';

import { paths } from '@/src/paths';

import Image from 'next/image';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageViewer } from '@/src/ui/atoms/ImageViewer';
import Category from '@/src/ui/molecules/Category';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';

const categories: {
  [index: string]: { label: React.ReactNode; icon: string };
} = {
  '0': {
    label: 'living room',
    icon: '/category-icons/Living-room.png',
  },
  '1': {
    label: 'office',
    icon: '/category-icons/Office.png',
  },
  '2': {
    label: 'for kids',
    icon: '/category-icons/For-kids.png',
  },
  kitchen: {
    label: 'kitchen',
    icon: '/category-icons/Kitchen.png',
  },
  accessories: {
    label: 'accessories',
    icon: '/category-icons/Accessories.png',
  },
};

const getCategoryIcon = (category: string) => {
  if (!categories[category]) return '';
  return categories[category].icon;
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

  const { query } = useRouter();
  useEffect(() => {
    if (typeof query.productId === 'string') {
      pageMounted(+query.productId);
    }
  }, [query.productId]);

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
            <Category
              name={product.categoryName}
              href={paths.home({}) + '?categoryId=' + product.categoryId}
            >
              <Image
                src={getCategoryIcon(product.categoryName)}
                width={50}
                height={50}
                alt=""
              />
            </Category>
          </div>

          <div className={classes['product__info']}>
            <div className={classes['product__name']}>{product.name}</div>

            <div className={classes['product__desc']}>
              {product.description}
            </div>

            <div className={classes['product__line']}>
              <div className={classes['product__price']}>
                <div className={classes['product__price-label']}>Cost</div>
                <span>
                  <span className={classes['product__price-curr']}>
                    {product.realPrice}
                  </span>
                  {product.oldPrice !== product.realPrice && (
                    <span className={classes['product__price-prev']}>
                      {product.oldPrice}
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
                  onChange={(e) => amountInCartChanged(Number(e.target.value))}
                  min="0"
                  disabled={cartItem.isInCart}
                />

                {cartItem.isInCart ? (
                  <CTAButton
                    color="primary"
                    onClick={() => removeFromCart()}
                    isLoading={isProductInCartPending}
                  >
                    Remove
                  </CTAButton>
                ) : (
                  <CTAButton
                    color="primary"
                    onClick={() => addToCart()}
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
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </Preloader>
        </div>
      </div>
    </div>
  );
}
