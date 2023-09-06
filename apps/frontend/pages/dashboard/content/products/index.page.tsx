import { useEffect, useId } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { useUnit } from 'effector-react';
import { $isPending, formSubmitted, productCreated } from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Form, FormError } from '@/src/ui/molecules/Form';
import { Field, InputField, TextAreaField } from '@/src/ui/molecules/Field';
import { MultipleImagesInput } from '@/src/ui/molecules/MultipleImagesInput';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { ProductCategoriesSelect } from '@/src/shared/components/ProductCategoriesSelect';
import { ProductsWidget } from './ProductsWidget';

export default function ProductsManagementPage() {
  const [isPending] = useUnit([$isPending]);

  const formSubmittedEvent = useUnit(formSubmitted);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: { label: '', value: '' },
      images: [] as { preview: string; raw: Blob }[],
    },
  });

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({
      name: data.name,
      description: data.description,
      price: Math.round(data.price * 100),
      categoryId: Number(data.category.value),
      images: data.images.map((image) => image.raw),
    });
  });

  useEffect(() => {
    return productCreated.watch(() => {
      reset();
    });
  }, [reset]);

  const imagesId = useId();
  const categoriesId = useId();

  return (
    <Container className="py-8">
      <MetaTags title="Manage products" />

      <H1>Manage products</H1>

      <Paper className="my-8">
        <H2>Add new product</H2>

        <Form className="text-center" onSubmit={onSubmit}>
          <InputField
            label="Name"
            placeholder="name"
            {...register('name', { required: 'Name is required!' })}
          />
          <FormError>{errors.name?.message}</FormError>

          <TextAreaField
            label="Description"
            placeholder="description"
            {...register('description')}
          />
          <FormError>{errors.description?.message}</FormError>

          <InputField
            label="Price"
            placeholder="0.00"
            type="number"
            step=".01"
            {...register('price', {
              required: 'Price is required!',
              valueAsNumber: true,
              min: { value: 0.01, message: 'Price must be positive' },
            })}
          />
          <FormError>{errors.price?.message}</FormError>

          <Field label="Category" htmlFor={categoriesId}>
            <Controller
              control={control}
              name="category"
              rules={{
                validate: (value) =>
                  value.value.length > 0 || 'Select category',
              }}
              render={({ field }) => (
                <ProductCategoriesSelect
                  option={field.value}
                  onChange={(option) => field.onChange(option)}
                  onBlur={field.onBlur}
                  id={categoriesId}
                />
              )}
            />
          </Field>
          <FormError>{errors.category?.message}</FormError>

          <Field label="Images" htmlFor={imagesId} className="mb-4">
            <Controller
              control={control}
              name="images"
              rules={{
                validate: (value) => value.length > 0 || 'Add images',
              }}
              render={({ field }) => (
                <MultipleImagesInput
                  images={field.value}
                  onChange={(newImages) => field.onChange(newImages)}
                  id={imagesId}
                />
              )}
            />
          </Field>
          <FormError>{errors.images?.message}</FormError>

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
