import { Theme } from 'react-select';

export function themeFactory(theme: Theme) {
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
