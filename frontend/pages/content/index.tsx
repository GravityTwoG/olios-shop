import Link from 'next/link';

import { paths } from '@/src/paths';

export default function ContentManagementPage() {
  return (
    <div>
      <p>
        <Link href={paths.contentCategories({})}>Manage categories</Link>
      </p>
      <p>
        <Link href={paths.contentProducts({})}>Manage products</Link>
      </p>
    </div>
  );
}
