import { clsx } from 'clsx';

import { ReactTagProps } from '@/src/ui/types';

export type ErrorTextProps = ReactTagProps<'span'>;

export const ErrorText = (props: ErrorTextProps) => {
  return (
    <span {...props} className={clsx('text-red-700', props.className)}>
      {props.children}
    </span>
  );
};
