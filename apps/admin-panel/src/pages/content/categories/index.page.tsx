import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { MetaTags } from '@olios-shop/admin/shared/components/MetaTags';
import { AddNewCategory } from '@olios-shop/admin/features/ProductCategory/components/organisms/AddNewCategory';
import { CategoriesWidget } from '@olios-shop/admin/features/ProductCategory/components/organisms/CategoriesWidget';

export default function CategoriesManagementPage() {
  return (
    <Container className="py-8">
      <MetaTags title="Manage categories" />

      <H1>Manage categories</H1>

      <div className="my-8">
        <AddNewCategory />
      </div>

      <div className="my-8">
        <CategoriesWidget />
      </div>
    </Container>
  );
}
