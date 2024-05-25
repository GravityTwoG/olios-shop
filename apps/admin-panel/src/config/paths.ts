import { path } from './path';

const home = path('/');

const login = path('/auth/sign-in');
const register = path('/auth/sign-up-employee');

const profile = path('/profile');

const product = path('/product/:id');

const orders = path('/orders');
const ordersCreate = path('/orders/create/:cartId');
const ordersPayment = path('/orders/payment/:orderId');
const ordersView = path('/orders/view/:orderId');

const content = path('/content');

const contentCategories = content.path('/categories');
const contentProducts = content.path('/products');

const manager = path('/manager');

const users = manager.path('/users');

const inviteCodes = manager.path('/invite-codes');
const inviteCodesCreate = inviteCodes.path('/create');

const manageOrders = manager.path('/orders');
const manageOrdersView = manageOrders.path('/view/:orderId');

export const paths = {
  home,

  login,
  register,
  profile,

  orders,
  ordersCreate,
  ordersPayment,
  ordersView,

  product,

  content,
  contentCategories,
  contentProducts,

  users,
  inviteCodes,
  inviteCodesCreate,
  manageOrders,
  manageOrdersView,
};
