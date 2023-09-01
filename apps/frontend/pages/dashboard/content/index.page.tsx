import { paths } from '@/src/paths';

import { Container } from '@/src/ui/atoms/Container';
import { AppLink } from '@/src/ui/atoms/AppLink';
import { MetaTags } from '@/src/shared/components/MetaTags';

export default function ContentManagementPage() {
  return (
    <Container className="py-8">
      <MetaTags title="Content Management" />

      <p className="my-8">
        <AppLink href={paths.contentCategories({})}>Manage categories</AppLink>
      </p>
      <p className="my-8">
        <AppLink href={paths.contentProducts({})}>Manage products</AppLink>
      </p>
    </Container>
  );
}
