import { path } from './path';

const home = path('/');

const login = path('/auth/sign-in');
const register = path('/auth/sign-up-employee');

const profile = path('/profile');

const product = path('/product/:id');

const content = path('/content');

const categories = content.path('/categories');
const products = content.path('/products');

const manager = path('/manager');

const users = manager.path('/users');

const inviteCodes = manager.path('/invite-codes');
const inviteCodesCreate = inviteCodes.path('/create');

const orders = manager.path('/orders');
const order = orders.path('/view/:orderId');

export const paths = {
  home,

  login,
  register,
  profile,

  product,

  content,
  categories: categories,
  products: products,

  users,
  inviteCodes,
  inviteCodesCreate,
  orders: orders,
  order: order,
};
