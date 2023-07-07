import { H1 } from '@/src/ui/atoms/Typography';
import { AddNewProduct } from '@/src/features/Product/components/organisms/AddNewProduct';
import { Container } from '@/src/ui/atoms/Container';

export default function ProductsManagementPage() {
  return (
    <Container className="py-8">
      <H1>Manage products</H1>

      <AddNewProduct />
    </Container>
  );
}
