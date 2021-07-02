import React from 'react';

import ProductCard from '../../../components/productCard/ProductCard';
import ProductsGrid from '../../../components/productsGrid/ProductsGrid';

class AllProducts extends React.Component {
  renderProducts = () => {
    const productIds = Object.entries(this.props.products);
    return productIds.map((product) => {
      const id = product[0];
      product = product[1];
      return (
        <ProductCard
          href={`/product/${id}`}
          img={product.imgUrl}
          size={product.imgSize}
          name={product.name}
          desc={product.desc}
          price={product.price}
          key={id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <div className="products__header">
          <div className="products__title">Products</div>
        </div>
        <ProductsGrid>{this.renderProducts()}</ProductsGrid>
        <button className="more-products">Show more products</button>
      </div>
    );
  }
}

export default AllProducts;
