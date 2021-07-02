import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers';
import { basketReducer } from './basket/reducers';
import { productPageReducer } from './productPage/reducers';
import { productsPageReducer } from './productsPage/reducers';

export default combineReducers({
  search: searchReducer,
  productPage: productPageReducer,
  productsPage: productsPageReducer,
  basket: basketReducer,
});
