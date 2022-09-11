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
  [index: string]: { label: React.ReactNode; icon: React.ReactNode };
} = {
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

export default function ProductPageContainer() {
  const { query } = useRouter();

  useEffect(() => {
    fetchProductFx(query.productId as string);
    fetchRecommendedProductsFx(query.productId as string);
  }, [query.productId]);

  const getCategoryIcon = (category: string) => {
    if (!categories[category]) return;
    return categories[category].icon;
  };

  const product = useStore($product);
  const recommendedProducts = useStore($recommendedProducts);
  const productCategory = useStore($productCategory);

  return (
    <ProductPage
      product={product}
      categoryIcon={getCategoryIcon(productCategory)}
      recomendedProducts={recommendedProducts}
    />
  );
}
