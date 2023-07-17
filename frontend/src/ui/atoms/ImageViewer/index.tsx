import React, { Fragment, useState } from 'react';

import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

type ImageViewerProps = {
  images: { src: string }[];
  isLoading?: boolean;
};

export const ImageViewer = React.memo((props: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { images } = props;
  return (
    <Fragment>
      <Lightbox
        slides={images}
        on={{
          click: () => setIsOpen(true),
        }}
        carousel={{ padding: '0px' }}
        animation={{ swipe: 200 }}
        inline={{
          style: { width: '100%', maxWidth: '900px', aspectRatio: '3 / 2' },
        }}
        plugins={[Inline]}
      />

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images}
        carousel={{ padding: '4px' }}
        animation={{ swipe: 200 }}
        plugins={[Zoom]}
      />
    </Fragment>
  );
});
