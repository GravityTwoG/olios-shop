import { useState } from 'react';
import { useRouter } from 'next/router';

import { createCategory } from '@/src/shared/api/product-categories';

import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { H2 } from '@/src/ui/atoms/Typography';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { InputField } from '@/src/ui/molecules/Field';

export function AddNewCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState('');

  const router = useRouter();

  const onSubmit = async () => {
    if (!name || !image || !imageURL) {
      return;
    }

    try {
      await createCategory(name, image);
      router.replace('/content');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper>
      <H2>Add new category</H2>

      <form className="text-center">
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="m-4">
          <ImageInput
            preview={imageURL}
            onChange={(image) => {
              setImage(image.raw);
              setImageURL(image.preview);
            }}
          />
        </div>

        <Button onClick={onSubmit}>Add new category</Button>
      </form>
    </Paper>
  );
}
