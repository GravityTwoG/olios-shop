import { BASKET_GET_ITEM, BASKET_DELETE_ITEM, BASKET_CLEAR_BASKET } from './actions';

const initialState = {
  products: []
}

export const basketReducer = (state = initialState, action) => {
  switch(action.type) {
    case BASKET_GET_ITEM:
      const products = [...state.products]
      products.push(action.payload)
      return {
        ...state,
        products
      }
    case BASKET_DELETE_ITEM:
      localStorage.removeItem('basket-item' + action.payload)
      const productsWD = state.products.filter( product => {
        if (product.productId === action.payload) {
          return false
        }
        return true;
      })

      return {
        ...state,
        products: productsWD
      }

    case BASKET_CLEAR_BASKET:
      return {
        ...state,
        products: []
      }

    default:
      return state
  }
}