import { SessionUserRole } from '@olios-shop/admin/shared/session';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { AddNewCategory } from '@olios-shop/admin/features/ProductCategory/components/AddNewCategory';
import { CategoriesWidget } from '@olios-shop/admin/features/ProductCategory/components/CategoriesWidget';

export const CategoriesPage = PrivatePage(() => {
  return (
    <Container className="py-8">
      <H1>Manage categories</H1>

      <div className="my-8">
        <AddNewCategory />
      </div>

      <div className="my-8">
        <CategoriesWidget />
      </div>
    </Container>
  );
}, [SessionUserRole.CONTENT_MANAGER]);
