import React from 'react';

import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import 'yet-another-react-lightbox/styles.css';

type ImageViewerProps = {
  images: { src: string }[];
  isLoading?: boolean;
};

export const ProductCardImage = React.memo((props: ImageViewerProps) => {
  const { images } = props;
  return (
    <Lightbox
      slides={images}
      carousel={{ padding: '0px', imageFit: 'cover' }}
      animation={{ swipe: 200 }}
      plugins={[Inline]}
      inline={{
        style: {
          width: '100%',
          maxWidth: '900px',
          height: '100%',
          aspectRatio: '3 / 2',
        },
      }}
      render={{
        buttonPrev: images.length <= 1 ? () => null : undefined,
        buttonNext: images.length <= 1 ? () => null : undefined,
      }}
    />
  );
});
