import React from 'react';

import {ProductCard} from '../../molecules/productCard/ProductCard';
import {ProductsGrid} from '../../molecules/productsGrid/ProductsGrid';

function ProductsByCategory(props) {
  const renderCategory = () => {
    return (
      <div className="products__category">
        <span>{props.category}</span>
        <p>
          <img src={props.categoryIcon} alt="" />
        </p>
      </div>
    );
  };

  const renderProducts = () => {
    if (props.products) {
      const productIds = Object.entries(props.products);
      return productIds.map((product) => {
        const id = product[0];
        product = product[1];
        return (
          <ProductCard
            href={`/product/${id}`}
            img={product.imgUrl}
            name={product.name}
            desc={product.desc}
            price={product.price}
            key={id}
          />
        );
      });
    }
    return null;
  };

  return (
    <div>
      <div className="products__header">
        <div className="products__title">Products</div>
        {renderCategory()}
      </div>
      <ProductsGrid>{renderProducts()}</ProductsGrid>
      <button className="more-products">Show more products</button>
    </div>
  );
}

export default ProductsByCategory;
