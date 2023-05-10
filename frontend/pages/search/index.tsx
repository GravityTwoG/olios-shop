import React from 'react';
import '@/pages/search/search.module.sass';

import { Container } from '@/src/ui/atoms/Container';
import { ProductsGrid } from '@/src/features/Product/components/molecules/productsGrid/ProductsGrid';
import { IProduct } from '@/src/types/IProduct';
import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';
import { fetchProducts } from '@/src/api/products';

function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState<IProduct[]>([]);

  const loadResults = async () => {
    try {
      const p = await fetchProducts({ take: 24, skip: 0 });
      setResults(p);
      setSearchQuery(searchQuery);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadResults();
  };

  return (
    <Container className="py-8">
      <form className="mt-10" onSubmit={onSubmit}>
        <div className="flex gap-1">
          <div className="flex flex-1">
            <input
              className="w-full h-10 text-indent-10"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="reset"
              className="w-10 block"
              onClick={() => setSearchQuery('')}
              children="x"
            />
          </div>
          <button type="submit" className="w-10 block bg-accent" children="?" />
        </div>

        <p className="mt-2">Type product that you are looking for!</p>
      </form>

      <div className="my-8">
        <ProductsGrid>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </div>
    </Container>
  );
}

export default SearchPage;
