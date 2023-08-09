import clsx from 'clsx';
import classes from './arrow.module.scss';

type ArrowProps = {
  direction: 'up' | 'down';
  className?: string;
};

export const Arrow = (props: ArrowProps) => {
  return (
    <div
      className={clsx(
        props.className,
        classes.Arrow,
        props.direction === 'up' && classes.up,
      )}
    >
      <span></span>
      <span></span>
    </div>
  );
};
