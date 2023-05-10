import { useEffect, useState } from 'react';
import { IProductCategory } from '@/src/types/IProductCategory';
import { deleteCategory, fetchCategories } from '@/src/api/product-categories';
import { Button } from '@/src/ui/atoms/Button';

export const CategoriesWidget = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [allCategoriesCount, setAllCategoriesCount] = useState(0);

  useEffect(() => {
    fetchCategories({ take: 24, skip: 0 })
      .then((data) => {
        setCategories(data.list);
        setAllCategoriesCount(data.count);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>All categories</h2>

      <ul>
        {categories.map((category) => (
          <ProductCategoryListItem key={category.id} category={category} />
        ))}
      </ul>

      <div>{allCategoriesCount}</div>
    </div>
  );
};

type ProductCategoryListItemProps = {
  category: IProductCategory;
};

const ProductCategoryListItem = ({
  category,
}: ProductCategoryListItemProps) => {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
      }}
    >
      <img
        src={category.iconUrl}
        alt={category.name}
        style={{ width: '60px', height: '60px', marginRight: '8px' }}
      />
      <div>{category.name}</div>

      <div style={{ marginLeft: 'auto' }}>
        <Button
          onDoubleClick={() => {
            deleteCategory(category.id);
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
