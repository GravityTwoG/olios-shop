import { createBrowserRouter } from 'react-router-dom';
import { routes } from '../config/routes';

export const router = createBrowserRouter(
  routes.map(({ path, component: Component }) => ({
    path,
    element: <Component />,
  })),
  {
    basename: '/admin-panel',
  },
);
