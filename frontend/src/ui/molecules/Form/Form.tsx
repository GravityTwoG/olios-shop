import clsx from 'clsx';
import { ReactTagProps } from '../../types';

export type FormProps = ReactTagProps<'form'>;

export const Form = (props: FormProps) => {
  return (
    <form
      {...props}
      className={clsx(props.className, 'd-flex items-stretch flex-col')}
    />
  );
};
