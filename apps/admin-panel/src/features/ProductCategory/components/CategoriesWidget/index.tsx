import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  $categories,
  $categoriesCount,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Input } from '@olios-shop/ui/atoms/Input';
import { H2 } from '@olios-shop/ui/atoms/Typography';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { Preloader } from '@olios-shop/ui/molecules/Preloader';
import { ProductCategoryItem } from './ProductCategoryItem';

export const CategoriesWidget = () => {
  const [
    categories,
    categoriesCount,
    pageSize,
    pageNumber,
    searchQuery,
    isPending,
  ] = useUnit([
    $categories,
    $categoriesCount,
    $pageSize,
    $pageNumber,
    $searchQuery,
    $isPending,
  ]);

  const [mountedEvent, searchQueryChangedEvent, loadPageEvent] = useUnit([
    mounted,
    searchQueryChanged,
    loadPage,
  ]);

  useEffect(() => {
    mountedEvent();
  }, [mountedEvent]);

  return (
    <Paper>
      <H2>Product Categories</H2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {categories.map((category) => (
            <ProductCategoryItem key={category.id} category={category} />
          ))}
        </ul>

        {categories.length === 0 && <NoResults>No Categories</NoResults>}
      </Preloader>

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={categoriesCount}
        onPageSelect={loadPageEvent}
      />
    </Paper>
  );
};
