import classes from './combobox.module.scss';

import { Theme } from 'react-select';
import AsyncSelect from 'react-select/async';

export type LoadOptionsCallback = (res: ComboboxOption[]) => void;

export type ComboboxOption = {
  value: string;
  label: string;
};

export type AsyncComboboxProps = {
  option: ComboboxOption;
  options: ComboboxOption[];

  onChange?: (option: ComboboxOption) => void;
  loadOptions:
    | ((inputValue: string) => Promise<ComboboxOption[]>)
    | ((inputValue: string, cb: LoadOptionsCallback) => void);

  placeholder?: string;
};

export const AsyncCombobox = (props: AsyncComboboxProps) => {
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
        cacheOptions
        menuPlacement="auto"
        theme={themeFactory}
      />
    </div>
  );
};

function themeFactory(theme: Theme) {
  return {
    ...theme,
    borderRadius: 16,
    colors: {
      ...theme.colors,
      primary: 'var(--accent-color)',
      primary25: 'var(--deco-color)',
    },
  };
}
