import { ReactNode } from 'react';

export type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText = (props: ErrorTextProps) => {
  return <span className="text-red-700">{props.children}</span>;
};
