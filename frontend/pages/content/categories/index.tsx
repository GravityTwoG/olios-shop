import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { AddNewCategory } from '@/src/features/ProductCategory/components/organisms/AddNewCategory';
import { CategoriesWidget } from '@/src/features/ProductCategory/components/organisms/CategoriesWidget';

export default function CategoriesManagementPage() {
  return (
    <Container className="py-8">
      <H1>Manage categories</H1>

      <div className="my-10">
        <AddNewCategory />
      </div>

      <div className="my-10">
        <CategoriesWidget />
      </div>
    </Container>
  );
}
