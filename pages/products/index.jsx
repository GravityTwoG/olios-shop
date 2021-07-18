import React from 'react';
import classes from '../../features/Product/components/organisms/allProducts/products.module.sass';

import { AllProducts } from '../../features/Product/components/organisms/allProducts/AllProducts';

function Products(props) {
  return (
    <div className={classes["products"]}>
      <AllProducts {...props} />
    </div>
  );
}

export default Products;
