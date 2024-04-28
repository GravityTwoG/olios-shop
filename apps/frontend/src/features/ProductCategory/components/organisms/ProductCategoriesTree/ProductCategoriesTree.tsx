import { useState } from 'react';
import clsx from 'clsx';
import useSWR from 'swr';

import { IProductCategory } from '@/src/types/IProductCategory';

import { ApiError, ListDTO } from '@/src/shared/api/lib';
import { fetchCategories } from '@/src/shared/api/product-categories';
import { toast } from '@/src/shared/toasts';

import Image from 'next/image';
import { Skeleton } from '@/src/ui/atoms/Skeleton';
import { H3 } from '@/src/ui/atoms/Typography';
import { Arrow } from '@/src/ui/atoms/Icons/Arrow';

const fetchCategoriesSWR = (parentId: number | null) =>
  fetchCategories({ take: 8, skip: 0, parentId });

export type ProductCategoriesTreeProps = {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategoryId: number | null;
};

export const ProductCategoriesTree = (props: ProductCategoriesTreeProps) => {
  return (
    <div className="py-4 w-[max-content]">
      <H3>Categories</H3>

      <button
        className={clsx(
          'mb-2 cursor-pointer min-w-[100px] text-left',
          props.selectedCategoryId === null &&
            'border-b-2 border-blue-800 text-blue-800',
        )}
        onClick={() => props.onCategorySelect(null)}
      >
        All
      </button>

      <ProductCategoriesChildren
        onClick={props.onCategorySelect}
        selectedCategoryId={props.selectedCategoryId}
      />
    </div>
  );
};

export type ProductCategoriesChildrenProps = {
  parentId?: number;
  onClick: (categoryId: number) => void;
  selectedCategoryId: number | null;
};

const ProductCategoriesChildren = (props: ProductCategoriesChildrenProps) => {
  const { data, isLoading } = useSWR<ListDTO<IProductCategory>, ApiError>(
    `/api/product-categories${props.parentId || 'null'}`,
    () => fetchCategoriesSWR(props.parentId || null),
    {
      errorRetryInterval: 20000,
      onError: (e) => {
        toast.error(e.message);
      },
    },
  );

  const categories = data ? data.list : [];

  if (categories.length === 0 && !isLoading) {
    return null;
  }

  return (
    <ul className="pl-4 mt-2 flex flex-col gap-2 w-[max-content]">
      {isLoading && (
        <li className="flex gap-2 items-center">
          <Skeleton width={20} height={20} />
          <Skeleton width={80} height={42} />
        </li>
      )}

      {categories.map((cat) => (
        <ProductCategoriesTreeNode
          key={cat.id}
          category={cat}
          onClick={props.onClick}
          selectedCategoryId={props.selectedCategoryId}
        />
      ))}
    </ul>
  );
};

export type ProductCategoriesTreeNodeProps = {
  category: IProductCategory;
  onClick: (categoryId: number) => void;
  selectedCategoryId: number | null;
};

const ProductCategoriesTreeNode = ({
  category,
  ...props
}: ProductCategoriesTreeNodeProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <li>
      <div
        className={clsx(
          'flex gap-4 items-center justify-between w-[max-content]  min-w-[100px] pb-1 border-b-2 border-transparent hover:border-b-2 hover:border-blue-800',
          props.selectedCategoryId === category.id &&
            'border-blue-800 text-blue-800',
        )}
      >
        <button
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => props.onClick(category.id)}
        >
          <Image
            width={20}
            height={20}
            src={category.iconUrl}
            alt={category.name}
            style={{ width: 20, height: 20 }}
          />
          <span>{category.name}</span>
        </button>

        {category.hasChildren && (
          <button
            title={isOpened ? 'Hide subcategories' : 'Show subcategories'}
            type="button"
            onClick={() => setIsOpened((s) => !s)}
            className="flex items-center justify-center"
          >
            <Arrow direction={isOpened ? 'up' : 'down'} />
          </button>
        )}
      </div>

      {isOpened && (
        <ProductCategoriesChildren
          parentId={category.id}
          onClick={props.onClick}
          selectedCategoryId={props.selectedCategoryId}
        />
      )}
    </li>
  );
};
