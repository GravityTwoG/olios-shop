import React from  'react';
import { requestItems, deleteItem, clearBasket } from '../../store/basket/actions';
import { connect } from 'react-redux';

import Basket from './Basket';

class BasketContainer extends React.Component {

  componentDidMount() {
    this.props.requestItems()
  }

  componentWillUnmount() {
    this.props.clearBasket()
  }

  render() {
    return (
      <Basket
        products={this.props.products}
        deleteItem={this.props.deleteItem}
      />
    )
  }
}

const mapStateToProps = state => ({
  products: state.basket.products
})

const mapDispatchToProps = {
  requestItems,
  deleteItem,
  clearBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketContainer);