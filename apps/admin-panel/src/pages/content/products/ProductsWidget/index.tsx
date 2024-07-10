import { useEffect } from 'react';

import { IProduct } from '@olios-shop/admin/types/IProduct';

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

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Input } from '@olios-shop/ui/atoms/Input';
import { Button } from '@olios-shop/ui/atoms/Button';
import { H2 } from '@olios-shop/ui/atoms/Typography';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { Preloader } from '@olios-shop/ui/molecules/Preloader';

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
      <H2>Products</H2>

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
      <img src={product.thumbUrl} alt={product.name} />
      <div>{product.name}</div>
      <div>
        <MonetaryValue value={product.realPrice} />
      </div>

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
