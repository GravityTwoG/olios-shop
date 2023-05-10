import { useState } from 'react';
import { useRouter } from 'next/router';

import { reduceFileSize } from '@/src/lib/reduce-image';
import { createCategory } from '@/src/api/product-categories';

import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { InputField } from '@/src/ui/atoms/InputField';
import { H2 } from '@/src/ui/atoms/Typography';

const MAX_FILE_SIZE = 1024 * 1024;

export function AddNewCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState('');

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (
      e.target.files &&
      e.target.files.length &&
      e.target.files[0].size <= MAX_FILE_SIZE
    ) {
      reduceFileSize(e.target.files[0], 500 * 1024, 1200, 1200, 0.9, (blob) => {
        if (blob) {
          setImage(blob);
          setImageURL(URL.createObjectURL(blob));
        } else {
          e.target.value = '';
        }
      });
    }
  };

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

      <form>
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="my-4"
        />

        <InputField
          type="file"
          name="file"
          accept="image/*"
          size={MAX_FILE_SIZE}
          title="Загрузить фотографию"
          aria-label="Загрузить фотографию"
          onChange={onImageChange}
          className="my-4"
        />

        <div className="flex justify-center my-4">
          {image && imageURL ? <img src={imageURL} alt={name} /> : null}
        </div>

        <div className="text-center my-4">
          <Button onClick={onSubmit}>Add new category</Button>
        </div>
      </form>
    </Paper>
  );
}
