import React, {useEffect} from 'react';

import ProductPage from '../../features/Product/components/organisms/ProductPage';

import LivingRoomIcon from '../../public/category-icons/Living-room.png';
import OfficeIcon from '../../public/category-icons/Office.png';
import ForKidsIcon from '../../public/category-icons/For-kids.png';
import KitchenIcon from '../../public/category-icons/Kitchen.png';
import AccessoriesIcon from '../../public/category-icons/Accessories.png';

import {
    $product, $productCategory,
    $recommendedProducts,
    fetchProductFx,
    fetchRecommendedProductsFx
} from "../../features/Product";
import {useRouter} from "next/router";
import {useStore} from "effector-react";

export default function ProductPageContainer() {
    const { query } = useRouter();

    useEffect(() => {
        fetchProductFx(query.productId);
        fetchRecommendedProductsFx(query.productId);
    }, [query.productId])

  const getCategoryIcon = (category) => {
    let categoryIcon;
    switch(category) {
       case 'living room':
          categoryIcon =  LivingRoomIcon;
          break;
       case 'office':
          categoryIcon =  OfficeIcon
          break;
       case 'for kids':
          categoryIcon =  ForKidsIcon
          break;
       case 'kitchen':
          categoryIcon =  KitchenIcon
          break;
       case 'accessories':
          categoryIcon =  AccessoriesIcon
          break;
       default:
         return;
    }
    return categoryIcon;
  }

  const product = useStore($product);
  const recommendedProducts = useStore($recommendedProducts);
  const productCategory = useStore($productCategory);

  return (
      <ProductPage
        product={product}
        categoryIcon={getCategoryIcon(productCategory)}
        recomendedProducts={recommendedProducts}
      />
    )
}

