import { useUnit } from 'effector-react';

import {
  $icon,
  $isPending,
  $name,
  formSubmitted,
  iconChanged,
  nameChanged,
} from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { H2 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { Form } from '@/src/ui/molecules/Form';
import { InputField } from '@/src/ui/molecules/Field';

export function AddNewCategory() {
  const [name, icon, isPending] = useUnit([$name, $icon, $isPending]);

  return (
    <Paper>
      <H2>Add new category</H2>

      <Form className="text-center" onSubmit={() => formSubmitted()}>
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => nameChanged(e.target.value)}
        />

        <div className="m-4">
          <ImageInput
            preview={icon.preview}
            onChange={(image) => {
              iconChanged(image);
            }}
          />
        </div>

        <CTAButton type="submit" isLoading={isPending}>
          Add new category
        </CTAButton>
      </Form>
    </Paper>
  );
}
