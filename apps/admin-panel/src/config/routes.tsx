import { SessionUserRole } from '../shared/session';
import { paths } from './paths';

import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/auth/sign-in.page';
import { SignUpPage } from '../pages/auth/sign-up.page';

export enum RouteAccess {
  'ANONYMOUS' = 'ANONYMOUS',
  'AUTHENTICATED' = 'AUTHENTICATED',
}

type Link = {
  label: string; // key of translation
  path: string;
  icon?: React.ReactNode;
};

export type PublicRouteDescriptor = {
  path: string;
  component: React.FC;
  access?: RouteAccess.ANONYMOUS;
  link?: Link;
};

export type PrivateRouteDescriptor = {
  path: string;
  component: React.FC;
  access: RouteAccess.AUTHENTICATED;
  forRoles: SessionUserRole[];
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
    access: RouteAccess.ANONYMOUS,
    link: {
      label: 'Sign In',
      path: paths.login({}),
    },
  },
  {
    path: paths.register.pattern,
    component: SignUpPage,
    access: RouteAccess.ANONYMOUS,
    link: {
      label: 'register',
      path: paths.register({}),
    },
  },
];
