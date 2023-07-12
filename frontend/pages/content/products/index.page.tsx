import { useId } from 'react';
import { useUnit } from 'effector-react';

import {
  $category,
  $description,
  $images,
  $isPending,
  $name,
  $price,
  categoryChanged,
  descriptionChanged,
  formSubmitted,
  imagesChanged,
  nameChanged,
  priceChanged,
} from './index.model';

import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Field, InputField, TextAreaField } from '@/src/ui/molecules/Field';
import { CategoriesSelect } from '@/src/shared/components/CategoriesSelect';

import { Form } from '@/src/ui/molecules/Form';
import { ProductsWidget } from './ProductsWidget';
import { Paper } from '@/src/ui/atoms/Paper';
import { MultipleImagesInput } from '@/src/ui/molecules/MultipleImagesInput';

export default function ProductsManagementPage() {
  const [name, description, price, category, images, isPending] = useUnit([
    $name,
    $description,
    $price,
    $category,
    $images,
    $isPending,
  ]);

  const imagesId = useId();
  const categoriesId = useId();

  return (
    <Container className="py-8">
      <H1>Manage products</H1>
      <H2>Add new product</H2>

      <Paper className="my-8">
        <Form className="text-center" onSubmit={() => formSubmitted()}>
          <InputField
            label="Name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => nameChanged(e.target.value)}
          />
          <TextAreaField
            label="Description"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => descriptionChanged(e.target.value)}
          />
          <InputField
            label="Price"
            name="price"
            placeholder="price"
            value={price}
            onChange={(e) => priceChanged(+e.target.value)}
          />
          <Field label="Category" htmlFor={categoriesId}>
            <CategoriesSelect
              option={category}
              onChange={(option) => categoryChanged(option)}
              id={categoriesId}
            />
          </Field>

          <Field label="Images" htmlFor={imagesId} className="mb-4">
            <MultipleImagesInput
              images={images}
              onChange={(newImages) => imagesChanged(newImages)}
              id={imagesId}
            />
          </Field>

          <CTAButton type="submit" isLoading={isPending}>
            Add new product
          </CTAButton>
        </Form>
      </Paper>

      <div className="my-8">
        <ProductsWidget />
      </div>
    </Container>
  );
}
