import clsx from 'clsx';
import classes from './form-error.module.scss';

import { ErrorText } from '../../atoms/ErrorText';
import { ReactTagProps } from '@olios-shop/ui/types';

export type FormErrorProps = ReactTagProps<'p'>;

export const FormError = ({ children, ...props }: FormErrorProps) => {
  return (
    <div {...props} className={clsx(props.className, classes.FormError)}>
      <ErrorText>{children}</ErrorText>
    </div>
  );
};
