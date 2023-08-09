import clsx from 'clsx';
import classes from './textarea.module.scss';

import { ReactTagProps } from '../../types';

export type TextAreaProps = ReactTagProps<'textarea'>;

export const TextArea = ({ rows = 4, ...props }: TextAreaProps) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange && props.onChange(e);

    const element = e.target;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight + 2}px`;
  };

  return (
    <textarea
      {...props}
      rows={rows}
      className={clsx(classes.TextArea, props.className)}
      onChange={onChange}
    />
  );
};
