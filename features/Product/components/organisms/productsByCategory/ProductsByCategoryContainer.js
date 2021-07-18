import React, {useCallback, useEffect, useState} from 'react';

import ProductsByCategory from './ProductsByCategory';

import LivingRoomIcon from '../../../../../public/category-icons/Living-room.png';
import OfficeIcon from '../../../../../public/category-icons/Office.png';
import ForKidsIcon from '../../../../../public/category-icons/For-kids.png';
import KitchenIcon from '../../../../../public/category-icons/Kitchen.png';
import AccesoriesIcon from '../../../../../public/category-icons/Accessories.png';

const categories = {

}

export default function ProductsByCategoryContainer(props) {
  const [state, setState] = useState({
    category: '',
    categoryIcon: {}
  })

  useEffect(() => {
    if (props.category) {
      computeCategory(props.category);
      //
    }
  }, [props.category]);

  const computeCategory = useCallback((categoryUrl) => {
    let categoryIcon;
    let category;
    switch (categoryUrl) {
      case 'living-room':
        category = 'living room';
        categoryIcon = LivingRoomIcon;
        break;
      case 'office':
        category = 'office';
        categoryIcon = OfficeIcon;
        break;
      case 'for-kids':
        category = 'for kids';
        categoryIcon = ForKidsIcon;
        break;
      case 'kitchen':
        category = 'kitchen';
        categoryIcon = KitchenIcon;
        break;
      case 'accesories':
        category = 'accesories';
        categoryIcon = AccesoriesIcon;
        break;
      default:
        return;
    }
    setState({
      category,
      categoryIcon,
    })}, []);

    return (
      <ProductsByCategory
        category={state.category}
        categoryIcon={state.categoryIcon}
        products={props.productsByCategory}
      />
    );
}
