import { useEffect, useState } from 'react';

import { debounce } from '../../lib/debounce';
import { fetchCategories } from '../../api/product-categories';

import {
  AsyncCombobox,
  AsyncComboboxProps,
  ComboboxOption,
} from '@/src/ui/atoms/Combobox';

export type CategoriesSelectProps = Pick<
  AsyncComboboxProps<string>,
  'option' | 'onChange' | 'id'
>;

export const CategoriesSelect = (props: CategoriesSelectProps) => {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    loadOptions('').then((options) => setCategories(options));
  }, []);

  return (
    <AsyncCombobox
      options={categories}
      loadOptions={loadOptionsDebounced}
      option={props.option}
      onChange={props.onChange}
      id={props.id}
    />
  );
};

const loadOptions = async (inputValue: string) => {
  try {
    const response = await fetchCategories({
      take: 25,
      skip: 0,
      name: inputValue,
    });
    return response.list.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

type Callback = (res: ComboboxOption<string>[]) => void;

const loadOptionsDebounced = debounce(
  (inputValue: string, cb: Callback) => loadOptions(inputValue).then(cb),
  200,
);
