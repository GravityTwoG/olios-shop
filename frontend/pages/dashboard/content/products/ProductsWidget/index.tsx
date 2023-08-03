import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  $products,
  $productsCount,
  $isDeleting,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  deleteProduct,
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
import { NoResults } from '@/src/ui/atoms/NoResults';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { IProduct } from '@/src/types/IProduct';

export const ProductsWidget = () => {
  const [
    products,
    productsCount,
    pageSize,
    pageNumber,
    searchQuery,
    isPending,
  ] = useUnit([
    $products,
    $productsCount,
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
      <H2>Product products</H2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </ul>

        {products.length === 0 && <NoResults>No products</NoResults>}
      </Preloader>

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={productsCount}
        onPageSelect={loadPageEvent}
      />
    </Paper>
  );
};

type ProductListItemProps = {
  product: IProduct;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const [isDeleting, deleteProductEvent] = useUnit([
    $isDeleting,
    deleteProduct,
  ]);

  return (
    <li className="flex items-center py-4 gap-2">
      <Image src={product.thumbUrl} alt={product.name} width={60} height={60} />
      <div>{product.name}</div>
      <div>{product.realPrice}</div>

      <div className="ml-auto">
        <Button
          onDoubleClick={() => {
            deleteProductEvent(product.id);
          }}
          isLoading={isDeleting}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
