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

import { Paper } from '@/src/ui/atoms/Paper';
import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Form } from '@/src/ui/molecules/Form';
import { Field, InputField, TextAreaField } from '@/src/ui/molecules/Field';
import { MultipleImagesInput } from '@/src/ui/molecules/MultipleImagesInput';
import { CategoriesSelect } from '@/src/shared/components/CategoriesSelect';
import { ProductsWidget } from './ProductsWidget';

export default function ProductsManagementPage() {
  const [name, description, price, category, images, isPending] = useUnit([
    $name,
    $description,
    $price,
    $category,
    $images,
    $isPending,
  ]);

  const [
    formSubmittedEvent,
    nameChangedEvent,
    descriptionChangedEvent,
    priceChangedEvent,
    categoryChangedEvent,
    imagesChangedEvent,
  ] = useUnit([
    formSubmitted,
    nameChanged,
    descriptionChanged,
    priceChanged,
    categoryChanged,
    imagesChanged,
  ]);

  const imagesId = useId();
  const categoriesId = useId();

  return (
    <Container className="py-8">
      <H1>Manage products</H1>
      <H2>Add new product</H2>

      <Paper className="my-8">
        <Form className="text-center" onSubmit={() => formSubmittedEvent()}>
          <InputField
            label="Name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => nameChangedEvent(e.target.value)}
          />
          <TextAreaField
            label="Description"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => descriptionChangedEvent(e.target.value)}
          />
          <InputField
            label="Price"
            name="price"
            placeholder="price"
            type="number"
            value={price}
            onChange={(e) => priceChangedEvent(Number(e.target.value))}
          />
          <Field label="Category" htmlFor={categoriesId}>
            <CategoriesSelect
              option={category}
              onChange={(option) => categoryChangedEvent(option)}
              id={categoriesId}
            />
          </Field>

          <Field label="Images" htmlFor={imagesId} className="mb-4">
            <MultipleImagesInput
              images={images}
              onChange={(newImages) => imagesChangedEvent(newImages)}
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
