import { fetchCategories } from '../../api/product-categories';

import {
  AsyncCombobox,
  AsyncComboboxProps,
} from '@olios-shop/ui/atoms/Combobox';

export type CategoriesSelectProps = Pick<
  AsyncComboboxProps<string>,
  'option' | 'onChange' | 'onBlur' | 'id'
> & { excludeId?: number };

export const ProductCategoriesSelect = (props: CategoriesSelectProps) => {
  return (
    <AsyncCombobox
      loadOptions={loadCategories}
      option={props.option}
      onChange={props.onChange}
      id={props.id}
    />
  );
};

export const loadCategories = async (inputValue: string) => {
  const response = await fetchCategories({
    take: 25,
    skip: 0,
    name: inputValue,
  });

  const options = response.list.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));
  return options;
};
