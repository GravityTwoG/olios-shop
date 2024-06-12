import { Outlet, createBrowserRouter } from 'react-router-dom';
import { routes } from '../config/routes';
import { MainLayout } from '../layouts/MainLayout';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      errorElement: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: routes.map(({ path, component: Component }) => ({
        path,
        element: <Component />,
      })),
    },
  ],
  {
    basename: '/admin-panel',
  },
);
