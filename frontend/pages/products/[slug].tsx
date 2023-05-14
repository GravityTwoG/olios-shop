import React, { useCallback, useEffect, useState } from 'react';
import classes from './products.module.sass';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $products, fetchProductsFx } from '@/src/features/Product';

import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';
import { ProductsGrid } from '@/src/features/Product/components/molecules/productsGrid/ProductsGrid';

const categories = {
  'living-room': {
    label: 'living room',
    icon: '/category-icons/Living-room.png',
  },
  office: {
    label: 'office',
    icon: '/category-icons/Office.png',
  },
  'for-kids': {
    label: 'for kids',
    icon: '/category-icons/For-kids.png',
  },
  kitchen: {
    label: 'kitchen',
    icon: '/category-icons/Kitchen.png',
  },
  accessories: {
    label: 'accessories',
    icon: '/category-icons/Accessories.png',
  },
};

export default function ProductsByCategoryPage() {
  const { query } = useRouter();
  const products = useStore($products);
  const [state, setState] = useState({
    category: '',
    categoryIcon: {} as any,
  });

  const computeCategory = useCallback((categoryUrl: string) => {
    if (!Object.hasOwn(categories, categoryUrl)) return;
    const category = categories[categoryUrl as keyof typeof categories];

    setState({
      category: category.label,
      categoryIcon: category.icon,
    });
  }, []);

  useEffect(() => {
    if (query.slug && typeof query.slug === 'string') {
      computeCategory(query.slug);
      //
    }
  }, [query.slug, computeCategory]);

  useEffect(() => {
    fetchProductsFx(state.category);
  }, [state.category]);

  return (
    <div className={classes['products']}>
      <div>
        <div className={classes['products__header']}>
          <div className={classes['products__title']}>Products</div>
          <div className={classes['products__category']}>
            <span>{state.category}</span>
            <p>
              <img src={state.categoryIcon} alt="category icon" />
            </p>
          </div>
        </div>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductsGrid>
        <button className={classes['more-products']}>Show more products</button>
      </div>
    </div>
  );
}
