import React from 'react';
import { connect } from 'react-redux';
import { requestProduct, requestRecomended, addToCart } from '../../store/productPage/actions';

import ProductPage from './ProductPage';

import LivingRoomIcon from '../../images/category-icons/Living-room.png';
import OfficeIcon from '../../images/category-icons/Office.png';
import ForKidsIcon from '../../images/category-icons/For-kids.png';
import KitchenIcon from '../../images/category-icons/Kitchen.png';
import AccesoriesIcon from '../../images/category-icons/Accesories.png';

class ProductPageContainer extends React.Component {

  componentDidMount() {
    this.props.requestProduct(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.requestProduct(this.props.match.params.id);
    }
    if (prevProps.productCategory !== this.props.productCategory) {
      this.props.requestRecomended(this.props.productCategory);
    }
  }

  getCategoryIcon = (category) => {
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
       case 'accesories':
          categoryIcon =  AccesoriesIcon
          break;
       default:
         return;
    }
    return categoryIcon;
  }

  render() {
    return (
      <ProductPage
        product={this.props.product}
        inCart={this.props.inCart}
        productId={this.props.match.params.id}
        categoryIcon={this.getCategoryIcon(this.props.productCategory)}
        recomendedProducts={this.props.recomendedProducts}
        addToCart={this.props.addToCart}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.productPage.product,
    inCart: state.productPage.inCart,
    productCategory: state.productPage.product.category,
    categoryIcon: '',
    recomendedProducts: state.productPage.recomendedProducts
  }
}

const mapDispatchToProps = {
  requestProduct,
  requestRecomended,
  addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer);
