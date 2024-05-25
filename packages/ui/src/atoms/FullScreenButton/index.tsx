import clsx from 'clsx';
import FullscreenIcon from './fullscreen.svg';

export type FullScreenButtonProps = {
  onClick: () => void;
  className?: string;
};

export const FullScreenButton = (props: FullScreenButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        props.className,
        'block p-1 rounded-sm transition-colors duration-200 hover:fill-[#0023ff] shadow-sm',
      )}
      title="fullscreen"
    >
      <FullscreenIcon />
    </button>
  );
};
