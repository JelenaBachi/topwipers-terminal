import React from 'react';
import { scrollToId } from '@/shared/lib/scrollTo';
import s from './AnchorPills.module.scss';

export type AnchorItem = { id: string; label: string };

type Props = {
  items: AnchorItem[];
  offsetTop?: number;
  rightSlot?: React.ReactNode;
  rootMargin?: string;
};

function readCssOffset(varName = '--header-offset', fallback = 0): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

export default function AnchorPills({ items, offsetTop, rightSlot, rootMargin }: Props) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const resolveOffset = React.useCallback(
    () => (typeof offsetTop === 'number' ? offsetTop : readCssOffset('--header-offset', 0)),
    [offsetTop],
  );
  const [offset, setOffset] = React.useState<number>(() => resolveOffset());

  React.useEffect(() => {
    const onResize = () => setOffset(resolveOffset());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [resolveOffset]);

  const effectiveRootMargin = React.useMemo(
    () => rootMargin ?? `-${offset + 8}px 0px -55% 0px`,
    [rootMargin, offset],
  );

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id, offset);
  };

  // refs для автопрокрутки ленты
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const itemRefs = React.useRef<Map<string, HTMLLIElement>>(new Map());

  const setItemRef = React.useCallback(
    (id: string) =>
      (el: HTMLLIElement | null): void => {
        if (el) itemRefs.current.set(id, el);
        else itemRefs.current.delete(id);
      },
    [],
  );

  // авто-скролл ленты к активной «пилюле»
  React.useEffect(() => {
    if (!activeId) return;
    const el = itemRefs.current.get(activeId);
    if (el && listRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  // отслеживание активной секции
  React.useEffect(() => {
    if (!items?.length || !('IntersectionObserver' in window)) return;

    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target?.id) setActiveId(best.target.id);
      },
      { root: null, rootMargin: effectiveRootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items, effectiveRootMargin]);

  if (!items?.length) return null;

  return (
    <div className={s.row}>
      <nav aria-label="Разделы на странице" className={s.nav}>
        <ul className={s.list} ref={listRef}>
          {items.map((it) => {
            const isActive = activeId === it.id;
            return (
              <li
                key={it.id}
                ref={setItemRef(it.id)}
                className={`${s.item} ${isActive ? s.isActive : ''}`}
              >
                <a
                  href={`#${it.id}`}
                  onClick={(e) => onClick(e, it.id)}
                  className={s.pill}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {rightSlot ? (
        <div className={s.right} role="toolbar" aria-label="Быстрые фильтры">
          {rightSlot}
        </div>
      ) : null}
    </div>
  );
}
