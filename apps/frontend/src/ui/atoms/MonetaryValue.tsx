import { memo } from 'react';

export type MonetaryValueProps = {
  value: number;
};

const dollarFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
});

export const toDollars = (value: number) => {
  const formattedValue = dollarFormat.format(value / 100);
  const withoutCommas = formattedValue.replace(/,/g, ' ');

  return withoutCommas;
};

export const MonetaryValue = memo((props: MonetaryValueProps) => {
  return toDollars(props.value);
});
