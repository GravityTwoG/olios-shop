import { paths } from './paths';

import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/auth/sign-in.page';
import { SignUpPage } from '../pages/auth/sign-up.page';
import { ProfilePage } from '../pages/ProfilePage';
import { OrdersPage } from '../pages/manager/orders/OrdersPage';
import { OrderPage } from '../pages/manager/orders/OrderPage/OrderPage';
import { InviteCodesPage } from '../pages/manager/invite-codes/InviteCodesPage';
import { CreateInviteCodePage } from '../pages/manager/invite-codes/CreateInviteCodePage';
import { UsersPage } from '../pages/manager/users/UsersPage';
import { ProductsPage } from '../pages/content/products/ProductsPage';
import { CategoriesPage } from '../pages/content/categories/CategoriesPage';

export enum RouteAccess {
  'ANONYMOUS' = 'ANONYMOUS',
  'AUTHENTICATED' = 'AUTHENTICATED',
}

type Link = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

export type PublicRouteDescriptor = {
  path: string;
  component: React.FC;
  link?: Link;
};

export type PrivateRouteDescriptor = {
  path: string;
  component: React.FC;
  link?: Link;
};

export type RouteDescriptor = PublicRouteDescriptor | PrivateRouteDescriptor;

export const routes: RouteDescriptor[] = [
  {
    path: paths.home.pattern,
    component: HomePage,
  },
  {
    path: paths.login.pattern,
    component: SignInPage,
    link: {
      label: 'Sign In',
      path: paths.login({}),
    },
  },
  {
    path: paths.register.pattern,
    component: SignUpPage,
    link: {
      label: 'register',
      path: paths.register({}),
    },
  },
  {
    path: paths.profile.pattern,
    component: ProfilePage,
  },

  {
    path: paths.product.pattern,
    component: () => null,
  },

  {
    path: paths.categories.pattern,
    component: CategoriesPage,
  },
  {
    path: paths.products.pattern,
    component: ProductsPage,
  },

  {
    path: paths.users.pattern,
    component: UsersPage,
  },
  {
    path: paths.inviteCodes.pattern,
    component: InviteCodesPage,
  },
  {
    path: paths.inviteCodesCreate.pattern,
    component: CreateInviteCodePage,
  },
  {
    path: paths.orders.pattern,
    component: OrdersPage,
  },
  {
    path: paths.order.pattern,
    component: OrderPage,
  },
];
