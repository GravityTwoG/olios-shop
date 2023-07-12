import classes from './combobox.module.scss';
import { themeFactory } from './theme';
import { ComboboxOption } from './types';

import Select from 'react-select';

export type ComboboxProps<T> = {
  option: ComboboxOption<T>;
  options: ComboboxOption<T>[];

  onChange?: (option: ComboboxOption<T>) => void;

  placeholder?: string;
  id?: string;
};

export const Combobox = function <T>(props: ComboboxProps<T>) {
  return (
    <div className={classes.Combobox}>
      <Select
        {...props}
        onChange={(o) => {
          if (o) {
            props.onChange && props.onChange(o);
          }
        }}
        theme={themeFactory}
      />
    </div>
  );
};
