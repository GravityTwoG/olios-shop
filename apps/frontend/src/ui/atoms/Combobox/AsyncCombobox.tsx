import classes from './combobox.module.scss';
import { themeFactory } from './theme';
import { ComboboxOption } from './types';

import AsyncSelect from 'react-select/async';

export type LoadOptionsCallback<T> = (res: ComboboxOption<T>[]) => void;

export type AsyncComboboxProps<T> = {
  option: ComboboxOption<T>;
  options: ComboboxOption<T>[];

  onChange?: (option: ComboboxOption<T>) => void;
  loadOptions:
    | ((inputValue: string) => Promise<ComboboxOption<T>[]>)
    | ((inputValue: string, cb: LoadOptionsCallback<T>) => void);

  placeholder?: string;
  id?: string;
};

export const AsyncCombobox = function <T>(props: AsyncComboboxProps<T>) {
  return (
    <div className={classes.Combobox}>
      <AsyncSelect
        defaultOptions={props.options}
        loadOptions={props.loadOptions}
        value={props.option}
        onChange={(v) => {
          if (v) {
            props.onChange && props.onChange(v);
          }
        }}
        placeholder={props.placeholder}
        id={props.id}
        cacheOptions
        menuPlacement="auto"
        theme={themeFactory}
      />
    </div>
  );
};
