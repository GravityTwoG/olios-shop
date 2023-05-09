import { useState } from 'react';
import { useRouter } from 'next/router';

import { reduceFileSize } from '@/src/lib/reduce-image';
import { createProduct } from '@/src/api/products';

import { Button } from '@/src/ui/atoms/Button';
import { InputField } from '@/src/ui/atoms/InputField';

const MAX_FILE_SIZE = 1024 * 1024;

export function AddNewProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

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
    if (!name || !description || !price || !categoryId || !image || !imageURL) {
      return;
    }

    try {
      await createProduct({
        name,
        description,
        price,
        categoryId,
        images: [image],
      });
      router.replace('/content');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p>Add new product</p>

      <form>
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label="Price"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <InputField
          label="Category"
          name="categoryId"
          placeholder="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(+e.target.value)}
          type="number"
        />

        <input
          type="file"
          name="file"
          accept="image/*"
          size={MAX_FILE_SIZE}
          title="Загрузить фотографию"
          aria-label="Загрузить фотографию"
          onChange={onImageChange}
        />

        {image && imageURL ? <img src={imageURL} alt={name} /> : null}

        <Button onClick={onSubmit}>Add new category</Button>
      </form>
    </div>
  );
}
