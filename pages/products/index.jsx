import React from 'react';
import './products.module.sass';

import AllProductsContainer from './allProducts/AllProductsContainer';

function Products(props) {
  return (
    <div className="products">
      <AllProductsContainer {...props} />
    </div>
  );
}

export default Products;
