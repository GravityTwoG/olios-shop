import { useId, useState } from 'react';
import clsx from 'clsx';
import classes from './image-input.module.scss';

import UploadIcon from './upload-icon.svg';
import { reduceFileSize } from './reduceFileSize';
import Image from 'next/image';

export type Image = { raw: Blob | null; preview: string };

export type ImageInputProps = {
  preview: string;
  onChange: (img: Image) => void;
  maxFileSizeInBytes?: number;
  className?: string;
  id?: string;
};

const MegaByte = 1024 * 1024;

export const ImageInput = ({
  maxFileSizeInBytes = MegaByte,
  ...props
}: ImageInputProps) => {
  const [error, setError] = useState('');

  const onImageChange = async (file: File) => {
    try {
      const blob = await reduceFileSize(file, 500 * 1024, 1200, 1200, 0.9);

      props.onChange({
        raw: blob,
        preview: URL.createObjectURL(blob),
      });
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error while processing image.');
    }
  };

  const onRemove = () => {
    URL.revokeObjectURL(props.preview);
    props.onChange({ raw: null, preview: '' });
  };

  const internalId = useId();
  const id = props.id || internalId;
  return (
    <div
      className={clsx(classes.ImageInput, props.className)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.persist();

        if (!e.dataTransfer.files.length) return;

        if (e.dataTransfer.files[0].size <= maxFileSizeInBytes) {
          onImageChange(e.dataTransfer.files[0]);
        } else {
          setError('Provided Image is very large.');
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <input
          type="file"
          accept="image/*"
          size={maxFileSizeInBytes}
          title="Upload image"
          aria-label="Upload image"
          id={id}
          className={classes.ImageInputReal}
          onChange={(e) => {
            e.persist();
            if (!e.target.files?.length) return;

            if (e.target.files[0].size <= maxFileSizeInBytes) {
              onImageChange(e.target.files[0]).then(() => {
                e.target.src = '';
              });
            } else {
              setError('Provided Image is very large.');
            }
          }}
        />

        <span className={classes.ImageInputInfo}>
          {`Max file size: ${Math.round(maxFileSizeInBytes / MegaByte)} MB`}
        </span>

        <label
          className={classes.ImageInputLabel}
          htmlFor={id}
          title="Upload image"
          aria-label="Upload image"
        >
          <UploadIcon />
        </label>

        <span className={clsx(classes.ImageInputInfo, classes.ImageInputError)}>
          {error}
        </span>
      </div>

      {props.preview && (
        <Image
          src={props.preview}
          width={100}
          height={100}
          alt=""
          className={classes.ImageInputPreview}
        />
      )}

      {props.preview && (
        <button
          type="button"
          className={classes.ImageInputRemove}
          onClick={onRemove}
          title="Remove image"
          aria-label="Remove image"
        />
      )}
    </div>
  );
};
