import { PRODUCTS_PAGE_GET_REQUESTES_PRODUCTS, PRODUCTS_PAGE_GET_REQUESTED_PRODUCTS_BY_CATEGORY } from './actions';

const initialState = {
  products: {},
  productsByCategory: []
}

export const productsPageReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCTS_PAGE_GET_REQUESTES_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }

    case PRODUCTS_PAGE_GET_REQUESTED_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: action.payload
      }


    default:
      return state
  }
}