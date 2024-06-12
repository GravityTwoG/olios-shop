import { paths } from './paths';

import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/auth/sign-in.page';
import { SignUpPage } from '../pages/auth/sign-up.page';
import { ProfilePage } from '../pages/ProfilePage';

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
];
