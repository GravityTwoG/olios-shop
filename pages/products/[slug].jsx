import React from 'react';
import { useRouter } from 'next/router';
import classes from '../../features/Product/components/organisms/allProducts/products.module.sass';

import ProductsByCategoryContainer from '../../features/Product/components/organisms/productsByCategory/ProductsByCategoryContainer';

function Products() {
  const {query} = useRouter();

  return (
    <div className={classes["products"]}>
      <ProductsByCategoryContainer category={query.slug} />
    </div>
  );
}

export default Products;
