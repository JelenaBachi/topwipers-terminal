import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { Thumb } from './EmblaCarouselThumbsButton';
import ArrowLeft from '@/assets/icons/back.svg?react';
import s from './EmblaCarousel.module.scss';

type Props = {
  gallery: string[];
  title?: string;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<Props> = ({ gallery, title = 'Фото', options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // MAIN
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    ...options,
  });

  // THUMBS
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const updateNavState = useCallback(() => {
    if (!emblaMainApi) return;
    setCanPrev(emblaMainApi.canScrollPrev());
    setCanNext(emblaMainApi.canScrollNext());
  }, [emblaMainApi]);

  // Buttons
  const scrollPrev = useCallback(() => emblaMainApi?.scrollPrev(), [emblaMainApi]);
  const scrollNext = useCallback(() => emblaMainApi?.scrollNext(), [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => emblaMainApi?.scrollTo(index),
    [emblaMainApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const i = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(i);
    emblaThumbsApi?.scrollTo(i);
    updateNavState();
  }, [emblaMainApi, emblaThumbsApi, updateNavState]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (!emblaThumbsApi) return;
    const rerender = () => updateNavState();
    emblaThumbsApi.on('reInit', rerender).on('scroll', rerender).on('select', rerender);
    updateNavState();
  }, [emblaThumbsApi, updateNavState]);

  if (!gallery?.length) return null;

  return (
    <div className={s.embla}>
      <div className={s['embla__viewport']} ref={emblaMainRef}>
        <div className={s['embla__container']}>
          {gallery.map((src, i) => (
            <div className={s['embla__slide']} key={src + i}>
              <div className={s.mainImage}>
                <img src={src} alt={`${title} — ${i + 1}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {gallery.length > 1 && (
        <div className={s.emblaThumbsWrap}>
          <button
            type="button"
            className={`${s.thumbNav} ${s.thumbPrev}`}
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Предыдущее фото"
          >
            <ArrowLeft aria-hidden />
          </button>

          <div className={s.emblaThumbs}>
            <div className={s['embla-thumbs__viewport']} ref={emblaThumbsRef}>
              <div className={s['embla-thumbs__container']}>
                {gallery.map((src, i) => (
                  <div className={s['embla-thumbs__slide']} key={src + i}>
                    <Thumb
                      src={src}
                      alt={`${title} превью ${i + 1}`}
                      selected={i === selectedIndex}
                      onClick={() => onThumbClick(i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`${s.thumbNav} ${s.thumbNext}`}
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Следующее фото"
          >
            <ArrowLeft aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
