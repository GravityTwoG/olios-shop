import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { IProductCategory } from '@/src/types/IProductCategory';
import {
  $categories,
  $categoriesCount,
  $isDeleting,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  deleteCategory,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import Image from 'next/image';
import { Paper } from '@/src/ui/atoms/Paper';
import { Input } from '@/src/ui/atoms/Input';
import { Button } from '@/src/ui/atoms/Button';
import { H2 } from '@/src/ui/atoms/Typography';
import { Paginator } from '@/src/ui/molecules/Paginator';

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

  useEffect(() => {
    mounted();
  }, []);

  return (
    <Paper>
      <H2>Product Categories</H2>

      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChanged(e.target.value)}
        className="mt-3"
      />

      <ul>
        {categories.map((category) => (
          <ProductCategoryListItem key={category.id} category={category} />
        ))}
      </ul>

      {categories.length === 0 && (
        <p className="text-center m-8">No categories</p>
      )}

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={categoriesCount}
        onPageSelect={loadPage}
      />
    </Paper>
  );
};

type ProductCategoryListItemProps = {
  category: IProductCategory;
};

const ProductCategoryListItem = ({
  category,
}: ProductCategoryListItemProps) => {
  const isDeleting = useUnit($isDeleting);

  return (
    <li className="flex items-center py-4 gap-2">
      <Image
        src={category.iconUrl}
        alt={category.name}
        width={60}
        height={60}
      />
      <div>{category.name}</div>

      <div className="ml-auto">
        <Button
          onDoubleClick={() => {
            deleteCategory(category.id);
          }}
          isLoading={isDeleting}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
