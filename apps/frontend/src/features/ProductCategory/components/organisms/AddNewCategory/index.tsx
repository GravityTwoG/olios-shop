import { useEffect, useState } from 'react';

import { useUnit } from 'effector-react';

import { loadCategories } from '@/src/shared/components/ProductCategoriesSelect';
import { $isPending, categoryCreated, formSubmitted } from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H2 } from '@/src/ui/atoms/Typography';
import { Form } from '@/src/ui/molecules/Form';

export function AddNewCategory() {
  const [isPending] = useUnit([$isPending]);
  const [formSubmittedEvent] = useUnit([formSubmitted]);

  const [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    return categoryCreated.watch(() => {
      setResetKey((key) => key + 1);
    });
  }, []);

  return (
    <Paper>
      <H2>Add new category</H2>

      <Form
        key={resetKey}
        config={{
          name: {
            type: 'text',
            required: 'Name is required!',
            placeholder: 'name',
            label: 'Name',
          },
          icon: {
            type: 'image',
            required: 'Icon is required!',
            label: 'Icon',
            validate: (value) => {
              if (value.raw === null) {
                return 'Icon is required!';
              }
              return true;
            },
          },
          parentCategory: {
            type: 'combobox',
            label: 'Parent category',
            required: 'Parent category is required!',
            loadOptions: loadCategories,
          },
        }}
        onSubmit={async (data) => {
          if (data.icon.raw === null) {
            return '';
          }

          formSubmittedEvent({
            name: data.name,
            categoryIcon: data.icon.raw,
            parentId: Number(data.parentCategory.value) || null,
          });
          return '';
        }}
        isPending={isPending}
        submitButtonVariant="CTA"
        submitText="Add category"
      />
    </Paper>
  );
}
