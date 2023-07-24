import { path } from './path';

const home = path('/');

const about = path('/about');

const login = path('/auth/sign-in');
const registerCustomer = path('/auth/sign-up');
const registerEmployee = path('/auth/sign-up-employee');

const profile = path('/profile');

const product = path('/product/:id');

const basket = path('/basket');

const orders = path('/orders');
const ordersCreate = path('/orders/create/:cartId');
const ordersPayment = path('/orders/payment/:orderId');
const ordersView = path('/orders/view/:orderId');

const dashboard = path('/dashboard');

const content = dashboard.path('/content');

const contentCategories = content.path('/categories');
const contentProducts = content.path('/products');

const manager = dashboard.path('/manager');

const users = manager.path('/users');

const inviteCodes = manager.path('/invite-codes');
const inviteCodesCreate = inviteCodes.path('/invite-codes/create');

const manageOrders = manager.path('/orders');
const manageOrdersView = manageOrders.path('/view/:orderId');

export const paths = {
  home,
  about,

  login,
  registerCustomer,
  registerEmployee,
  profile,

  basket,
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
