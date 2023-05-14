export type TypographyProps = React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const H1 = (props: TypographyProps) => {
  return (
    <h1
      {...props}
      className={
        'text-4xl/loose font-bold' + (props.className ? props.className : '')
      }
    />
  );
};

export const H2 = (props: TypographyProps) => {
  return (
    <h2
      {...props}
      className={
        'text-2xl font-bold' + (props.className ? props.className : '')
      }
    />
  );
};

export const H3 = (props: TypographyProps) => {
  return (
    <h3
      {...props}
      className={'text-xl font-bold' + (props.className ? props.className : '')}
    />
  );
};

export const H4 = (props: TypographyProps) => {
  return (
    <h4 {...props} className={' ' + (props.className ? props.className : '')} />
  );
};

export const H5 = (props: TypographyProps) => {
  return (
    <h5 {...props} className={' ' + (props.className ? props.className : '')} />
  );
};

export const H6 = (props: TypographyProps) => {
  return (
    <h6 {...props} className={' ' + (props.className ? props.className : '')} />
  );
};
