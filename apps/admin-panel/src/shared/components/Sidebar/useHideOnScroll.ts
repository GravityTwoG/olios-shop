import { useEffect, useRef } from 'react';

export const useHideOnScroll = <T extends HTMLElement>({
  scrollHeight,
}: {
  scrollHeight: number;
}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    let delta = scrollHeight;

    function onScroll() {
      if (!ref.current) return;

      const currentScrollPos = window.scrollY;
      delta += currentScrollPos - prevScrollPos;

      if (currentScrollPos <= scrollHeight) {
        ref.current.dataset.isHidden = 'false';
        prevScrollPos = currentScrollPos;
        return;
      }

      if (delta > scrollHeight) {
        delta = scrollHeight;
        ref.current.dataset.isHidden = 'true';
      } else if (delta < 0) {
        delta = 0;
        ref.current.dataset.isHidden = 'false';
      }

      prevScrollPos = currentScrollPos;
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollHeight]);

  return ref;
};
