import { useEffect, useMemo, useState } from 'react';

import classes from './combobox.module.scss';
import { themeFactory } from './theme';
import { ComboboxOption } from './types';

import AsyncSelect, { AsyncProps } from 'react-select/async';
import { debounce } from '@olios-shop/ui/lib/debounce';
import { GroupBase } from 'react-select';

export type LoadOptionsCallback<T> = (res: ComboboxOption<T>[]) => void;

export type AsyncComboboxProps<T> = {
  option: ComboboxOption<T>;

  onChange?: (option: ComboboxOption<T>) => void;
  onBlur?: AsyncProps<
    ComboboxOption<T>,
    false,
    GroupBase<ComboboxOption<T>>
  >['onBlur'];
  loadOptions: (inputValue: string) => Promise<ComboboxOption<T>[]>;

  placeholder?: string;
  id?: string;
  name?: string;
};

const defaultOption = {
  label: '-',
  value: '',
  object: null,
} as ComboboxOption<string>;

export const AsyncCombobox = function <T>(props: AsyncComboboxProps<T>) {
  const [options, setOptions] = useState<ComboboxOption<T>[]>([
    defaultOption as ComboboxOption<T>,
  ]);

  const loadOptionsDebounced = useMemo(() => {
    return debounce(
      (inputValue: string, cb: LoadOptionsCallback<T>) => {
        props
          .loadOptions(inputValue || '')
          .then((opts) => {
            cb([...opts, defaultOption as ComboboxOption<T>]);
          })
          .catch((err) => {
            console.error(err);
            return [defaultOption];
          });
      },
      200,
      {},
    );
  }, [props.loadOptions]);

  useEffect(() => {
    props.loadOptions('').then((opts) => {
      setOptions([...opts, defaultOption as ComboboxOption<T>]);
    });
  }, [props.loadOptions]);

  return (
    <div className={classes.Combobox}>
      <AsyncSelect
        name={props.name}
        defaultOptions={options}
        loadOptions={(inputValue: string, cb: LoadOptionsCallback<T>) => {
          loadOptionsDebounced(inputValue, (opts: ComboboxOption<T>[]) =>
            cb(opts),
          );
        }}
        value={props.option}
        onChange={(v) => {
          if (v) {
            props.onChange && props.onChange(v);
          }
        }}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        id={props.id}
        cacheOptions
        menuPlacement="auto"
        theme={themeFactory}
      />
    </div>
  );
};
