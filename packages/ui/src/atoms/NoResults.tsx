import clsx from 'clsx';
import { ReactTagProps } from '@olios-shop/ui/types';

export type NoResultsProps = ReactTagProps<'div'>;

export const NoResults = (props: NoResultsProps) => {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        'p-5 font-bold text-xl text-zinc-400 text-center',
      )}
    />
  );
};
