import { paths } from '@/src/paths';

import Link from 'next/link';
import { Container } from '@/src/ui/atoms/Container';

export default function ContentManagementPage() {
  return (
    <Container className="py-8">
      <p className="my-8">
        <Link href={paths.contentCategories({})}>Manage categories</Link>
      </p>
      <p className="my-8">
        <Link href={paths.contentProducts({})}>Manage products</Link>
      </p>
    </Container>
  );
}
