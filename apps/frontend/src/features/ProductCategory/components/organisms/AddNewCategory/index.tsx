import { useEffect, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useUnit } from 'effector-react';

import { $isPending, categoryCreated, formSubmitted } from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H2 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { Form, FormError } from '@/src/ui/molecules/Form';
import { Field, InputField } from '@/src/ui/molecules/Field';
import { ProductCategoriesSelect } from '@/src/shared/components/ProductCategoriesSelect';

export function AddNewCategory() {
  const [isPending] = useUnit([$isPending]);
  const [formSubmittedEvent] = useUnit([formSubmitted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      icon: { preview: '', raw: null as null | Blob },
      parentCategory: { label: '', value: '' },
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (data.icon.raw === null) {
      return;
    }

    formSubmittedEvent({
      name: data.name,
      categoryIcon: data.icon.raw,
      parentId: Number(data.parentCategory.value) || null,
    });
  });

  useEffect(() => {
    return categoryCreated.watch(() => {
      reset();
    });
  }, [reset]);

  const iconId = useId();
  const categoriesId = useId();
  return (
    <Paper>
      <H2>Add new category</H2>

      <Form className="text-center" onSubmit={onSubmit}>
        <InputField
          label="Name"
          placeholder="name"
          {...register('name', { required: 'Name is required!' })}
        />
        <FormError>{errors.name?.message}</FormError>

        <Field label="Icon" htmlFor={iconId}>
          <Controller
            name="icon"
            control={control}
            rules={{
              validate: (value) =>
                value.preview !== null || 'Icon is required!',
            }}
            render={({ field }) => (
              <ImageInput
                preview={field.value.preview}
                onChange={(image) => {
                  field.onChange(image);
                }}
              />
            )}
          />
        </Field>
        <FormError>{errors.icon?.message}</FormError>

        <Field label="Parent category" htmlFor={categoriesId}>
          <Controller
            name="parentCategory"
            control={control}
            render={({ field }) => (
              <ProductCategoriesSelect
                option={field.value}
                onChange={(cat) => field.onChange(cat)}
              />
            )}
          />
        </Field>
        <FormError>{errors.parentCategory?.message}</FormError>

        <CTAButton type="submit" isLoading={isPending}>
          Add new category
        </CTAButton>
      </Form>
    </Paper>
  );
}
