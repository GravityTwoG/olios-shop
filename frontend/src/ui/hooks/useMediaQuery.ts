import { useState, useEffect } from 'react';

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
// example mediaQuery: (max-width: 768px)
export const useMediaQuery = (mediaQuery: string) => {
  const isSSR = typeof window == 'undefined';
  const [isVerified, setIsVerified] = useState(
    !isSSR && !!window.matchMedia(mediaQuery).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};
