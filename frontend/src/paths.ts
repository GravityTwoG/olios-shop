import { path } from './path';

const home = path('/');
const basket = path('/basket');
const search = path('/search');
const about = path('/about');

const login = path('/auth/sign-in');
const registerCustomer = path('/auth/sign-up');
const registerEmployee = path('/auth/sign-up-employee');

const profile = path('/profile');

const product = path('/product/:id');

const content = path('/content');
const contentCategories = content.path('/categories');
const contentProducts = content.path('/products');

const users = path('/manager/users');
const inviteCodes = path('/manager/invite-codes');
const inviteCodesCreate = path('/manager/invite-codes/create');

export const paths = {
  home,
  basket,
  search,
  about,

  login,
  registerCustomer,
  registerEmployee,
  profile,

  product,

  content,
  contentCategories,
  contentProducts,

  users,
  inviteCodes,
  inviteCodesCreate,
};
