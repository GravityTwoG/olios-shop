import { useEffect, useState } from 'react';

import { debounce } from '../../lib/debounce';
import { fetchCategories } from '../../api/product-categories';

import {
  AsyncCombobox,
  AsyncComboboxProps,
  ComboboxOption,
} from '@/src/ui/atoms/Combobox';
import { toast } from '../../toasts';
import { ApiError } from '../../api';

export type CategoriesSelectProps = Pick<
  AsyncComboboxProps<string>,
  'option' | 'onChange' | 'onBlur' | 'id'
> & { excludeId?: number };

const defaultCategory = { label: 'Not selected', value: '' };

export const ProductCategoriesSelect = (props: CategoriesSelectProps) => {
  const [categories, setCategories] = useState([defaultCategory]);

  useEffect(() => {
    loadOptions('').then((options) => {
      if (props.excludeId) {
        setCategories(
          options.filter((o) => o.value !== props.excludeId?.toString()),
        );
      } else {
        setCategories(options);
      }
    });
  }, [props.excludeId]);

  return (
    <AsyncCombobox
      options={categories}
      loadOptions={(inputValue: string, cb: Callback) => {
        const myCb = (options: ComboboxOption<string>[]) => {
          if (props.excludeId) {
            cb(options.filter((o) => o.value !== props.excludeId?.toString()));
          } else {
            cb(options);
          }
        };

        loadOptionsDebounced(inputValue, myCb);
      }}
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

    const options = response.list.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    }));

    options.push(defaultCategory);

    return options;
  } catch (error) {
    toast.error((error as ApiError).message);
    return [];
  }
};

type Callback = (res: ComboboxOption<string>[]) => void;

const loadOptionsDebounced = debounce(
  (inputValue: string, cb: Callback) => loadOptions(inputValue).then(cb),
  200,
);
