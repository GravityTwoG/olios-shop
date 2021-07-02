import { PRODUCT_PAGE_GET_REQUESTED_PRODUCT, PRODUCT_PAGE_GET_REQUESTED_RECOMENDED, PRODUCT_PAGE_ADD_TO_CART } from './actions';

const initialState = {
    product: {},
    productId: '',
    inCart: false,
    categoryIcon: '',
    recomendedProducts: []
}

export const productPageReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCT_PAGE_GET_REQUESTED_PRODUCT: {
      let inCart;
      if (localStorage.getItem('basket-item' + action.payload.id)) {
        inCart = true
      }
      return {
        ...state,
        product: action.payload.product,
        inCart
      }
    }
    case PRODUCT_PAGE_GET_REQUESTED_RECOMENDED:
      return {
        ...state,
        recomendedProducts: action.payload
      }

    case PRODUCT_PAGE_ADD_TO_CART: {
      let inCart;
      if (!localStorage.getItem('basket-item' + action.payload.productId)) {
        localStorage.setItem('basket-item' + action.payload.productId, JSON.stringify(action.payload))
        inCart = true;
      }
      else {
        localStorage.removeItem('basket-item' + action.payload.productId)
        inCart = false;
      }
      return {
        ...state,
        inCart
      }
    }

    default:
      return state;
  }
}