import { useUnit } from 'effector-react';

import { loadCategories } from '@olios-shop/admin/features/ProductCategory/components/ProductCategoriesSelect';
import { $isPending, formSubmitted } from './index.model';
import { SessionUserRole } from '@olios-shop/admin/shared/session';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { H1, H2 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { Form } from '@olios-shop/ui/molecules/Form';
import { ProductsWidget } from './ProductsWidget';

export const ProductsPage = PrivatePage(() => {
  const [isPending] = useUnit([$isPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  return (
    <Container className="py-8">
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
}, [SessionUserRole.CONTENT_MANAGER]);
