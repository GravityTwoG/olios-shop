// import ProductService from '../../services/ProductService';
// const productService = new ProductService();

export const PRODUCTS_PAGE_REQUEST_PRODUCTS = 'PRODUCTS_PAGE_REQUEST_PRODUCTS';
export const PRODUCTS_PAGE_GET_REQUESTES_PRODUCTS =
  'PRODUCTS_PAGE_GET_REQUESTES_PRODUCTS';
export const PRODUCTS_PAGE_REQUEST_PRODUCTS_BY_CATEGORY =
  'PRODUCTS_PAGE_REQUEST_PRODUCTS_BY_CATEGORY';
export const PRODUCTS_PAGE_GET_REQUESTED_PRODUCTS_BY_CATEGORY =
  'PRODUCTS_PAGE_REQUEST_PRODUCTS_BY_CATEGORY';

export const requestProducts = () => {
  return (dispatch) => {
    // productService.getProducts().then((products) => {
    //   if (products) {
    //     dispatch(getRequestedProducts(products));
    //   }
    // });
  };
};

export const getRequestedProducts = (products) => ({
  type: PRODUCTS_PAGE_GET_REQUESTES_PRODUCTS,
  payload: products,
});

export const requestProductsByCategory = (category) => {
  return (dispatch) => {
    // productService.getProductsByCategory(category).then((products) => {
    //   if (products) {
    //     dispatch(getRequestedProductsByCategory(products));
    //   } else {
    //     dispatch(getRequestedProductsByCategory());
    //   }
    // });
  };
};

export const getRequestedProductsByCategory = (products) => ({
  type: PRODUCTS_PAGE_GET_REQUESTED_PRODUCTS_BY_CATEGORY,
  payload: products,
});
