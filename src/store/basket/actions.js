// import ProductService from './../../services/ProductService';
// const productService = new ProductService();

export const BASKET_REQUEST_ITEMS = 'BASKET_REQUEST_ITEMS';
export const BASKET_GET_ITEM = 'BASKET_GET_ITEM';
export const BASKET_DELETE_ITEM = 'BASKET_DELETE_ITEM';
export const BASKET_CLEAR_BASKET = 'BASKET_CLEAR_STATE';

export const requestItems = () => {
  return (dispatch) => {
    const basketItemKeys = Object.keys(localStorage).filter((key) => {
      return key.includes('basket-item');
    });
    const basketItems = basketItemKeys.map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    basketItems.forEach((basketItem) => {
      // productService.getProduct(basketItem.productId).then( product => {
      //   dispatch(getRequestedItem({
      //     productId: basketItem.productId,
      //     imgUrl: product.imgUrl,
      //     name: product.name,
      //     price: product.price,
      //     quantity: basketItem.quantity
      //   }))
      // })
    });
  };
};

export const getRequestedItem = (product) => ({
  type: BASKET_GET_ITEM,
  payload: product,
});

export const deleteItem = (basketItemId) => ({
  type: BASKET_DELETE_ITEM,
  payload: basketItemId,
});

export const clearBasket = () => ({
  type: BASKET_CLEAR_BASKET,
});
