import { useState } from 'react';
import { useRouter } from 'next/router';

import { createProduct } from '@/src/shared/api/products';

import { H2 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { Field, InputField, TextAreaField } from '@/src/ui/molecules/Field';
import { CategoriesSelect } from '@/src/shared/components/CategoriesSelect';

export function AddNewProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState({ label: '', value: '' });

  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState('');

  const router = useRouter();

  const onSubmit = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !category.value ||
      !image ||
      !imageURL
    ) {
      return;
    }

    try {
      await createProduct({
        name,
        description,
        price,
        categoryId: Number(category.value),
        images: [image],
      });
      router.replace('/content');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <H2>Add new product</H2>

      <form className="text-center">
        <InputField
          label="Name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextAreaField
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
        <Field label="Category">
          <CategoriesSelect
            option={category}
            onChange={(option) => setCategory(option)}
          />
        </Field>

        <div className="m-4">
          <ImageInput
            preview={imageURL}
            onChange={(image) => {
              setImage(image.raw);
              setImageURL(image.preview);
            }}
          />
        </div>

        <CTAButton onClick={onSubmit}>Add new product</CTAButton>
      </form>
    </div>
  );
}
