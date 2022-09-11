import React, { useEffect } from 'react';
import classes from './products.module.sass';

import { useStore } from 'effector-react';
import { $products, fetchProductsFx } from '@/src/features/Product';

import { ProductsGrid } from '@/src/features/Product/components/molecules/productsGrid/ProductsGrid';
import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';

export default function AllProducts() {
  useEffect(() => {
    fetchProductsFx();
  }, []);
  const products = useStore($products);

  return (
    <div className={classes['products']}>
      <div>
        <div className={classes['products__header']}>
          <div className={classes['products__title']}>Products</div>
        </div>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductsGrid>

        <button className={classes['more-products']}>Show more products</button>
      </div>
    </div>
  );
}
