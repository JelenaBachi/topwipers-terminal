import { useEffect, useState } from 'react';

export function useHeaderOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = document.querySelector('header[data-app-header]') as HTMLElement | null;
    if (!el) return;

    const update = () => setOffset(el.offsetHeight || 0);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return offset;
}
