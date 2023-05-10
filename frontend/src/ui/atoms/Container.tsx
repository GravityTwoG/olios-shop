import { ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = (props: ContainerProps) => {
  return (
    <div
      className={
        'max-w-4xl m-auto px-3 ' + (props.className ? props.className : '')
      }
    >
      {props.children}
    </div>
  );
};
