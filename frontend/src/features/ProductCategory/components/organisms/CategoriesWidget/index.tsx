import { useEffect, useState } from 'react';
import { IProductCategory } from '@/src/types/IProductCategory';
import {
  deleteCategory,
  fetchCategories,
} from '@/src/shared/api/product-categories';

import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { H2 } from '@/src/ui/atoms/Typography';

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
    <Paper>
      <H2>All categories</H2>

      <ul>
        {categories.map((category) => (
          <ProductCategoryListItem key={category.id} category={category} />
        ))}
      </ul>

      <div className="text-center">{allCategoriesCount}</div>
    </Paper>
  );
};

type ProductCategoryListItemProps = {
  category: IProductCategory;
};

const ProductCategoryListItem = ({
  category,
}: ProductCategoryListItemProps) => {
  return (
    <li className="flex items-center py-4 gap-2">
      <img
        src={category.iconUrl}
        alt={category.name}
        style={{ width: '60px', height: '60px' }}
      />
      <div>{category.name}</div>

      <div className="ml-auto">
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
