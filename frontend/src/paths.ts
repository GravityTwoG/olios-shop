import { path } from './path';

const home = path('/');
const basket = path('/basket');
const search = path('/search');
const about = path('/about');
const login = path('/auth/sign-in');
const register = path('/auth/sign-up');
const profile = path('/profile');
const products = path('/products');
const product = path('/product/:id');
const content = path('/content');
const contentCategories = content.path('/categories');
const contentProducts = content.path('/products');

export const paths = {
  home,
  basket,
  search,
  about,

  login,
  register,
  profile,

  products,
  product,

  content,
  contentCategories,
  contentProducts,
};
