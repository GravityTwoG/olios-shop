export type PaperProps = React.HTMLAttributes<HTMLDivElement>;

export const Paper = (props: PaperProps) => {
  return (
    <div
      {...props}
      className={
        'bg-white py-3 px-4 ' + (props.className ? props.className : '')
      }
    />
  );
};
