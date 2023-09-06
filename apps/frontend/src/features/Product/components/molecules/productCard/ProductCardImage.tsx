import React, { useState } from 'react';
import Link from 'next/link';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { FullScreenButton } from '@/src/ui/atoms/FullScreenButton';

type ImageViewerProps = {
  images: { src: string }[];
  isLoading?: boolean;
  link: string;
};

export const ProductCardImage = React.memo((props: ImageViewerProps) => {
  const { images } = props;

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="h-full overflow-hidden relative">
      <Link
        href={props.link}
        className="w-full h-full flex items-center justify-center"
      >
        <img
          src={
            props.images.length
              ? props.images[0].src
              : 'https://via.placeholder.com/450x300'
          }
          className="max-w-full max-h-full object-cover"
        />
      </Link>

      <FullScreenButton
        onClick={() => setIsOpened(true)}
        className="absolute bottom-2 right-2"
      />

      <Lightbox
        open={isOpened}
        close={() => setIsOpened(false)}
        slides={images}
        carousel={{ padding: '4px' }}
        animation={{ swipe: 200 }}
        plugins={[Zoom]}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
});
