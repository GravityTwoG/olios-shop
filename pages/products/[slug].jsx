import React from 'react';
import { useRouter } from 'next/router';
import './products.module.sass';

import ProductsByCategoryContainer from './productsByCategory/ProductsByCategoryContainer';

function Products() {
  const router = useRouter();

  return (
    <div className="products">
      <ProductsByCategoryContainer category={router.query.slug} />
    </div>
  );
}

export default Products;
