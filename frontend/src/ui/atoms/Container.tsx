import { ReactNode } from 'react';
import { ReactTagProps } from '../types';
import clsx from 'clsx';

export type ContainerProps = ReactTagProps<'div'>;

export const Container = (props: ContainerProps) => {
  return (
    <div
      {...props}
      className={clsx(props.className, 'max-w-4xl m-auto px-3 ')}
    />
  );
};
