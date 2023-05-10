import { AddNewCategory } from '@/src/features/ProductCategory/components/organisms/AddNewCategory';
import { CategoriesWidget } from '@/src/features/ProductCategory/components/organisms/CategoriesWidget';

export default function CategoriesManagementPage() {
  return (
    <div>
      <h1>Manage categories</h1>

      <AddNewCategory />

      <CategoriesWidget />
    </div>
  );
}
