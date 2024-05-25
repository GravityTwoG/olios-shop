import { path } from './path';

const home = path('/');

const about = path('/about');

const login = path('/auth/sign-in');
const registerCustomer = path('/auth/sign-up');

const profile = path('/profile');

const product = path('/product/:id');

const cart = path('/cart');

const orders = path('/orders');
const ordersCreate = path('/orders/create/:cartId');
const ordersPayment = path('/orders/payment/:orderId');
const ordersView = path('/orders/view/:orderId');

export const paths = {
  home,
  about,

  login,
  registerCustomer,
  profile,

  cart,
  orders,
  ordersCreate,
  ordersPayment,
  ordersView,

  product,
};
