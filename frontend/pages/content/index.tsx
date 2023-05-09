import Link from 'next/link';

export default function ContentManagementPage() {
  return (
    <div>
      <p>
        <Link href="/content/categories">Manage categories</Link>
      </p>
      <p>
        <Link href="/content/products">Manage products</Link>
      </p>
    </div>
  );
}
