import { paths } from '@olios-shop/admin/paths';

import { Container } from '@olios-shop/ui/atoms/Container';
import { AppLink } from '@olios-shop/ui/atoms/AppLink';
import { MetaTags } from '@olios-shop/admin/shared/components/MetaTags';

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
