import { useUnit } from 'effector-react';

import { loadCategories } from '@/src/shared/components/ProductCategoriesSelect';
import { $isPending, formSubmitted } from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { Form } from '@/src/ui/molecules/Form';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { ProductsWidget } from './ProductsWidget';

export default function ProductsManagementPage() {
  const [isPending] = useUnit([$isPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  return (
    <Container className="py-8">
      <MetaTags title="Manage products" />

      <H1>Manage products</H1>

      <Paper className="my-8">
        <H2>Add new product</H2>

        <Form
          className="text-center"
          config={{
            name: {
              type: 'text',
              label: 'Name',
              placeholder: 'name',
              required: 'Name is required!',
            },
            description: {
              type: 'textarea',
              label: 'Description',
              placeholder: 'description',
            },
            price: {
              type: 'number',
              label: 'Price',
              placeholder: '0.00',
              step: '.01',
              required: 'Price is required!',
            },
            category: {
              type: 'combobox',
              label: 'Category',
              placeholder: 'Select category',
              required: 'Select category',
              loadOptions: loadCategories,
            },
            images: {
              type: 'images',
              label: 'Images',
              required: 'Select images',
            },
          }}
          onSubmit={async (data) => {
            formSubmittedEvent({
              name: data.name,
              description: data.description,
              price: Math.round(Number(data.price) * 100),
              categoryId: Number(data.category.value),
              images: data.images.map((image) => image.raw),
            });
            return '';
          }}
          submitText="Add product"
          isPending={isPending}
          submitButtonVariant="CTA"
        />
      </Paper>

      <div className="my-8">
        <ProductsWidget />
      </div>
    </Container>
  );
}
