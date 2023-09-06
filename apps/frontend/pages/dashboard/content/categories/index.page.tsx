import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { AddNewCategory } from '@/src/features/ProductCategory/components/organisms/AddNewCategory';
import { CategoriesWidget } from '@/src/features/ProductCategory/components/organisms/CategoriesWidget';

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
