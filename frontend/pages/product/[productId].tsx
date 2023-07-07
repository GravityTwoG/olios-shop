import React, { useEffect } from 'react';

import ProductPage from '@/src/features/Product/components/organisms/ProductPage';

import {
  $product,
  $productCategory,
  $recommendedProducts,
  fetchProductFx,
  fetchRecommendedProductsFx,
} from '@/src/features/Product';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

const categories: {
  [index: string]: { label: React.ReactNode; icon: string };
} = {
  '0': {
    label: 'living room',
    icon: '/category-icons/Living-room.png',
  },
  '1': {
    label: 'office',
    icon: '/category-icons/Office.png',
  },
  '2': {
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

export default function ProductPageContainer() {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.productId === 'string') {
      fetchProductFx(+query.productId);
      fetchRecommendedProductsFx(+query.productId);
    }
  }, [query.productId]);

  const getCategoryIcon = (category: string) => {
    if (!categories[category]) return '';
    return categories[category].icon;
  };

  const product = useStore($product);
  const recommendedProducts = useStore($recommendedProducts);
  const productCategory = useStore($productCategory);

  return (
    <ProductPage
      product={product}
      categoryIcon={getCategoryIcon(productCategory)}
      recommendedProducts={recommendedProducts}
      inCart={false}
    />
  );
}
