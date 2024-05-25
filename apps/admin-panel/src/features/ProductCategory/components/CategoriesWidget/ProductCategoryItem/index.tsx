import { useState } from 'react';
import { useUnit } from 'effector-react';

import { IProductCategory } from '@olios-shop/admin/types/IProductCategory';
import { toast } from '@olios-shop/admin/shared/toasts';

import { $isDeleting, deleteCategory, updateCategory } from './index.model';

import Image from 'next/image';
import { Button } from '@olios-shop/ui/atoms/Button';
import { Input } from '@olios-shop/ui/atoms/Input';
import {
  Image as ImageType,
  ImageInput,
} from '@olios-shop/ui/atoms/ImageInput';
import { ProductCategoriesSelect } from '@olios-shop/admin/shared/components/ProductCategoriesSelect';

type ProductCategoryItemProps = {
  category: IProductCategory;
};

export const ProductCategoryItem = ({ category }: ProductCategoryItemProps) => {
  const [isDeleting, deleteCategoryEvent, updateCategoryEvent] = useUnit([
    $isDeleting,
    deleteCategory,
    updateCategory,
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState<ImageType>({
    preview: '',
    raw: null,
  });
  const [parentCategory, setParentCategory] = useState({
    label: 'Not selected',
    value: '',
  });
  const [isPending, setIsPending] = useState(false);

  const onSave = () => {
    try {
      setIsPending(true);
      updateCategoryEvent({
        id: category.id,
        name,
        categoryIcon: icon.raw || undefined,
        parentId: parentCategory.value.trim().length
          ? Number(parentCategory.value)
          : null,
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
      <li className="flex items-start justify-start py-4 gap-2 flex-wrap">
        <div className="flex-shrink-0 w-[120px]">
          <ImageInput preview={icon.preview} onChange={(i) => setIcon(i)} />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Parent category</span>
          <ProductCategoriesSelect
            option={parentCategory}
            onChange={(cat) => setParentCategory(cat)}
            excludeId={category.id}
          />
        </div>

        <div className="ml-auto flex flex-col gap-2">
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

      <div className="ml-auto flex flex-col gap-2">
        <Button
          onClick={() => {
            setName(category.name);
            setIcon({ preview: category.iconUrl, raw: null });
            setParentCategory({
              label: category.parentName || 'Not selected',
              value: category.parentId ? category.parentId.toString() : '',
            });
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
        <Button
          onDoubleClick={() => deleteCategoryEvent(category.id)}
          isLoading={isDeleting}
          color="danger"
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
