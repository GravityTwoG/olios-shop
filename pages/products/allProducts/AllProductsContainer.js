import React from 'react';
import { connect } from 'react-redux';
import { requestProducts } from '../../../src/store/productsPage/actions';

import AllProducts from './AllProducts';

class AllProductsContainer extends React.Component {
  componentDidMount() {
    this.props.requestProducts();
  }

  render() {
    return <AllProducts products={this.props.products} />;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsPage.products,
  };
};

const mapDispatchToProps = {
  requestProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductsContainer);
