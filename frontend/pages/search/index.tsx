import React from 'react';
import '@/pages/search/search.module.sass';
import { ProductsGrid } from '@/src/features/Product/components/molecules/productsGrid/ProductsGrid';

function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const getResults = () => {
    return [];
  };

  return (
    <div className="Search">
      <div className="searchForm">
        <div className="searchForm__cont">
          <input
            className="searchForm__input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="searchForm__reset"
            onClick={() => setSearchQuery('')}
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
