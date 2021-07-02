// import ProductService from '../../services/ProductService';
// const productService = new ProductService();

export const PRODUCT_PAGE_REQUEST_PRODUCT = 'PRODUCT_PAGE_REQUEST_PRODUCT';
export const PRODUCT_PAGE_GET_REQUESTED_PRODUCT =
  'PRODUCT_PAGE_GET_REQUESTED_PRODUCT';
export const PRODUCT_PAGE_REQUEST_RECOMENDED =
  'PRODUCT_PAGE_REQUEST_RECOMENDED';
export const PRODUCT_PAGE_GET_REQUESTED_RECOMENDED =
  'PRODUCT_PAGE_GET_REQUESTED_RECOMENDED';
export const PRODUCT_PAGE_ADD_TO_CART = 'PRODUCT_PAGE_ADD_TO_CART';

export const requestProduct = (productId) => {
  return (dispatch) => {
    // productService.getProduct(productId).then((product) => {
    //   if (product) {
    //     dispatch(getRequestedProduct(product, productId));
    //   } else {
    //     dispatch(getRequestedProduct());
    //   }
    // });
  };
};

export const getRequestedProduct = (product, id) => ({
  type: PRODUCT_PAGE_GET_REQUESTED_PRODUCT,
  payload: { product, id },
});

export const requestRecomended = (category) => {
  return (dispatch) => {
    productService.getProducts().then((products) => {
      dispatch(getRequestedRecomended(products));
    });
  };
};

export const getRequestedRecomended = (products) => ({
  type: PRODUCT_PAGE_GET_REQUESTED_RECOMENDED,
  payload: products,
});

export const addToCart = (productId, quantity) => ({
  type: PRODUCT_PAGE_ADD_TO_CART,
  payload: {
    productId,
    quantity,
  },
});
