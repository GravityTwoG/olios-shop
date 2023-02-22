import React from 'react';
import '@/pages/search/search.module.sass';

import { ProductCard } from '../molecules/productCard/ProductCard';
import { ProductsGrid } from '../molecules/productsGrid/ProductsGrid';

function SearchPage(props) {
  const getResults = () => {
    if (props.results) {
      const productIds = Object.entries(props.results);
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
  };

  const onSearchWordChange = (event) => {
    props.updateSearchWord(event.target.value);
  };

  return (
    <div className="Search">
      <div className="searchForm">
        <div className="searchForm__cont">
          <input
            className="searchForm__input"
            type="text"
            value={props.searchWord}
            onChange={onSearchWordChange}
          />
          <button
            className="searchForm__reset"
            onClick={props.resetSearchWord}
          />
        </div>
        <div className="searchForm__label">
          Type product that you are looking for
        </div>
      </div>
      <div className="Search__results">
        <ProductsGrid>{getResults()}</ProductsGrid>
      </div>
    </div>
  );
}

export default SearchPage;
