import React from 'react';
import { connect } from 'react-redux';
import { requestProductsByCategory } from '../../../src/store/productsPage/actions';

import ProductsByCategory from './ProductsByCategory';

import LivingRoomIcon from '../../../src/images/category-icons/Living-room.png';
import OfficeIcon from '../../../src/images/category-icons/Office.png';
import ForKidsIcon from '../../../src/images/category-icons/For-kids.png';
import KitchenIcon from '../../../src/images/category-icons/Kitchen.png';
import AccesoriesIcon from '../../../src/images/category-icons/Accesories.png';

class ProductsByCategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categoryIcon: {},
    };
  }

  componentDidMount() {
    if (this.props.category) {
      this.computeCategory(this.props.category);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.computeCategory(this.props.category);
    }
    if (prevState.category !== this.state.category) {
      this.props.requestProductsByCategory(this.state.category);
    }
  }

  computeCategory = (categoryUrl) => {
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
    this.setState({
      category,
      categoryIcon,
    });
  };

  render() {
    return (
      <ProductsByCategory
        category={this.state.category}
        categoryIcon={this.state.categoryIcon}
        products={this.props.productsByCategory}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsByCategory: state.productsPage.productsByCategory,
  };
};

const mapDispatchToProps = {
  requestProductsByCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsByCategoryContainer);
