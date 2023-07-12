import { useState } from 'react';
import { useUnit } from 'effector-react';

import { IProductCategory } from '@/src/types/IProductCategory';
import { toast } from '@/src/shared/toasts';

import { $isDeleting, deleteCategory, updateCategoryFx } from './index.model';

import Image from 'next/image';
import { Button } from '@/src/ui/atoms/Button';
import { Input } from '@/src/ui/atoms/Input';
import { Image as ImageType, ImageInput } from '@/src/ui/atoms/ImageInput';

type ProductCategoryItemProps = {
  category: IProductCategory;
};

export const ProductCategoryItem = ({ category }: ProductCategoryItemProps) => {
  const isDeleting = useUnit($isDeleting);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState<ImageType>({
    preview: '',
    raw: null,
  });
  const [isPending, setIsPending] = useState(false);

  const onSave = async () => {
    try {
      setIsPending(true);
      await updateCategoryFx({
        id: category.id,
        name,
        categoryIcon: icon.raw || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      toast.unknownError(error);
    } finally {
      setIsPending(false);
    }
  };

  if (isEditing) {
    return (
      <li className="flex items-center justify-start py-4 gap-2 flex-wrap">
        <div className="flex-shrink-0 w-[120px]">
          <ImageInput preview={icon.preview} onChange={(i) => setIcon(i)} />
        </div>
        <div className="flex-grow-0 w-auto">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="ml-auto flex gap-2">
          <Button isLoading={isPending} onClick={() => onSave()}>
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)}>Close</Button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center py-4 gap-2">
      <Image
        src={category.iconUrl}
        alt={category.name}
        width={60}
        height={60}
      />
      <div>{category.name}</div>

      <div className="ml-auto flex gap-2">
        <Button
          onClick={() => {
            setName(category.name);
            setIcon({ preview: category.iconUrl, raw: null });
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
        <Button
          onDoubleClick={() => deleteCategory(category.id)}
          isLoading={isDeleting}
          color="danger"
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
