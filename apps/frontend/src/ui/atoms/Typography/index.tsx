import clsx from 'clsx';

export type TypographyProps = React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const H1 = (props: TypographyProps) => {
  return (
    <h1
      {...props}
      className={clsx(props.className, 'text-4xl/loose font-bold')}
    />
  );
};

export const H2 = (props: TypographyProps) => {
  return (
    <h2
      {...props}
      className={clsx(props.className, 'text-2xl/loose font-bold')}
    />
  );
};

export const H3 = (props: TypographyProps) => {
  return (
    <h3
      {...props}
      className={clsx(props.className, 'text-xl/loose font-bold')}
    />
  );
};

export const H4 = (props: TypographyProps) => {
  return <h4 {...props} className={clsx(props.className, 'text-sm')} />;
};

export const H5 = (props: TypographyProps) => {
  return (
    <h5 {...props} className={clsx(props.className, 'text-xs leading-[1.1]')} />
  );
};

export const H6 = (props: TypographyProps) => {
  return (
    <h6 {...props} className={clsx(props.className, 'text-xs leading-[1]')} />
  );
};