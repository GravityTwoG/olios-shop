// import ProductService from '../../services/ProductService';
// const productService = new ProductService();

export const SEARCH_UPDATE_SEARCHWORD = 'SEARCH_UPDATE_SEARCHWORD';
export const SEARCH_RESET_SEARCHWORD = 'SEARCH_RESET_SEARCHWORD';
export const SEARCH_REQUEST_SEARCHED_PRODUCTS =
  'SEARCH_REQUEST_SEARCHED_PRODUCTS';
export const SEARCH_GET_REQUESTED_PRODUCTS = 'SEARCH_GET_REQUESTED_PRODUCTS';

export const requestSearchedProducts = (requestWord) => {
  return (dispatch) => {
    if (requestWord.trim()) {
      // productService.getSearchedProducts(requestWord)
      //   .then( results => {
      //     if (results) {
      //       dispatch(getRequestedProducts(results))
      //     } else {
      //       dispatch(getRequestedProducts())
      //     }
      //   })
    } else {
      dispatch(getRequestedProducts());
    }
  };
};

export const getRequestedProducts = (results) => ({
  type: SEARCH_GET_REQUESTED_PRODUCTS,
  payload: results,
});

export const updateSearchWord = (searchWord) => ({
  type: SEARCH_UPDATE_SEARCHWORD,
  payload: searchWord,
});

export const resetSearchWord = () => ({
  type: SEARCH_RESET_SEARCHWORD,
});
