import { Button } from '@olios-shop/ui';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  return (
    <div>
      <RouterProvider router={router} />

      <Button>Hello shad/cn</Button>
    </div>
  );
}
