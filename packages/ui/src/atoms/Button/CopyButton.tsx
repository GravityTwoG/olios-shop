import { useState } from 'react';
import { clsx } from 'clsx';

import { ReactTagProps } from '@olios-shop/ui/types';

import classes from './copy-button.module.scss';

import CopyIcon from '../Icons/Copy.svg';

const COPIED_STATE_DURATION_MS = 1000;

export type CopyButtonProps = Omit<ReactTagProps<'button'>, 'children'> & {
  text: string;
};

export const CopyButton = (props: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(props.text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), COPIED_STATE_DURATION_MS);
        })
        .catch((err) => {
          console.error('Async: Could not copy text: ', err);
        });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_STATE_DURATION_MS);
    }
  };

  return (
    <button
      {...props}
      type="button"
      className={clsx(classes.CopyButton, props.className)}
      onClick={copy}
      data-copied={copied}
      disabled={copied}
      title={copied ? 'Copied' : 'Copy'}
      aria-label={copied ? 'Copied' : 'Copy'}
    >
      <CopyIcon />
    </button>
  );
};
