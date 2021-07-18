import React, {useEffect} from 'react';
import classes from './products.module.sass'
import { $products, fetchProductsFx } from "../../../index";
import { useStore } from "effector-react";

import { ProductCard } from '../../molecules/productCard/ProductCard';
import { ProductsGrid } from '../../molecules/productsGrid/ProductsGrid';

export function AllProducts() {
    useEffect(() => {
        fetchProductsFx();
    }, [])
    const products = useStore($products);

  return (
      <div>
        <div className={classes["products__header"]}>
          <div className={classes["products__title"]}>Products</div>
        </div>
        <ProductsGrid>
            {products.map((product) =>  (
                    <ProductCard
                        product={product}
                        key={product.id}
                    />
                )
            )}
        </ProductsGrid>

          <button className={classes["more-products"]}>Show more products</button>
      </div>
  );
}
