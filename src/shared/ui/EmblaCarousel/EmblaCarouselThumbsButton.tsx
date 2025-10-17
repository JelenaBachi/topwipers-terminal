import React from "react";
import s from "./EmblaCarousel.module.scss";

type Props = {
  selected: boolean;
  src: string;
  alt?: string;
  onClick: () => void;
};

export const Thumb: React.FC<Props> = ({ selected, src, alt, onClick }) => {
  return (
    <div
      className={
        s["embla-thumbs__slide"] +
        (selected ? " " + s["embla-thumbs__slide--selected"] : "")
      }
    >
      <button
        type="button"
        onClick={onClick}
        className={s["embla-thumbs__slide__button"]}
        aria-current={selected ? "true" : undefined}
      >
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className={s["embla-thumbs__img"]}
        />
      </button>
    </div>
  );
};
