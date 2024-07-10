import { Image, ImageInput } from '../../atoms/ImageInput';

export type MultipleImagesInput = {
  images: { preview: string; raw: Blob }[];
  onChange: (images: { preview: string; raw: Blob }[]) => void;
  id?: string;
};

export const MultipleImagesInput = (props: MultipleImagesInput) => {
  return (
    <div className={'flex flex-wrap gap-4'}>
      {props.images.map((image, idx) => (
        <ImageInput
          key={image.preview}
          preview={image.preview}
          onChange={(image) => {
            if (!isNotNull(image)) {
              props.onChange(props.images.filter((_, index) => index !== idx));
            }
          }}
        />
      ))}

      <ImageInput
        preview=""
        onChange={(image) => {
          if (isNotNull(image)) {
            props.onChange([...props.images, image]);
          }
        }}
        id={props.id}
      />
    </div>
  );
};

function isNotNull(image: Image): image is { preview: string; raw: Blob } {
  return image.raw !== null;
}
