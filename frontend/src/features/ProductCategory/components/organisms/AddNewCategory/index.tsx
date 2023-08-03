import { useUnit } from 'effector-react';

import {
  $icon,
  $isPending,
  $name,
  $parentCategory,
  formSubmitted,
  iconChanged,
  nameChanged,
  parentCategoryChanged,
} from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H2 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { Form } from '@/src/ui/molecules/Form';
import { Field, InputField } from '@/src/ui/molecules/Field';
import { ProductCategoriesSelect } from '@/src/shared/components/ProductCategoriesSelect';
import { useId } from 'react';

export function AddNewCategory() {
  const [name, icon, parentCategory, isPending] = useUnit([
    $name,
    $icon,
    $parentCategory,
    $isPending,
  ]);

  const [
    formSubmittedEvent,
    nameChangedEvent,
    iconChangedEvent,
    parentCategoryChangedEvent,
  ] = useUnit([formSubmitted, nameChanged, iconChanged, parentCategoryChanged]);

  const iconId = useId();
  const categoriesId = useId();
  return (
    <Paper>
      <H2>Add new category</H2>

      <Form className="text-center" onSubmit={() => formSubmittedEvent()}>
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => nameChangedEvent(e.target.value)}
        />

        <Field label="Icon" htmlFor={iconId}>
          <ImageInput
            preview={icon.preview}
            onChange={(image) => {
              iconChangedEvent(image);
            }}
          />
        </Field>

        <Field label="Category" htmlFor={categoriesId}>
          <ProductCategoriesSelect
            option={parentCategory}
            onChange={(cat) => parentCategoryChangedEvent(cat)}
          />
        </Field>

        <CTAButton type="submit" isLoading={isPending}>
          Add new category
        </CTAButton>
      </Form>
    </Paper>
  );
}
