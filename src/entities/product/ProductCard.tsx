import s from './ProductCard.module.scss';
import type { Product } from '@/entities/product/types';
import Button from '@/shared/ui/Button/Button';
import CheckIcon from '@/assets/icons/check.svg?react';
import XIcon from '@/assets/icons/close.svg?react';

type Props = {
  product: Product;
  onShelf?: () => void;
};

const fmt = (v?: number) => (v == null ? '—' : new Intl.NumberFormat('ru-RU').format(v) + ' ₽');

export default function ProductCard({ product, onShelf }: Props) {
  const {
    name,
    imgUrl,
    price,
    sku,
    features = [],
    availability,
    labels = [],
    detailsHref,
  } = product;

  const outOfStock = availability?.inStock === false;

  return (
    <article className={s.card} aria-label={name}>
      <div className={s.mediaCol}>
        <div className={s.media}>
          {imgUrl ? (
            <img src={imgUrl} alt={name} loading="lazy" />
          ) : (
            <div className={s.placeholder} />
          )}
        </div>

        <div className={s.priceRow}>
          <div className={s.price}>{fmt(price)}</div>

          {availability && (
            <span
              className={`${s.badge} ${availability.inStock ? s.badgeOk : s.badgeNo}`}
              role="status"
            >
              {availability.inStock ? (
                <>
                  <CheckIcon className={s.icon} aria-hidden="true" />
                  {availability.label ?? 'In stock'}
                </>
              ) : (
                <>
                  <XIcon className={s.icon} aria-hidden="true" />
                  {availability.label ?? 'Out of stock'}
                </>
              )}
            </span>
          )}
        </div>
      </div>

      <div className={s.bodyCol}>
        <div className={s.content}>
          <div className={s.head}>
            <h3 className={s.title}>{name}</h3>

            {labels.length > 0 && (
              <ul className={s.labels} aria-label="Метки">
                {labels.filter(Boolean).map((l) => (
                  <li key={l} className={s.label}>
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {features.length > 0 && (
            <ul className={s.features}>
              {features.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          <div className={s.metaRow}>
            <a
              className={s.more}
              href={detailsHref ?? '#'}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (!detailsHref) e.preventDefault();
              }}
            >
              Подробнее о товаре
            </a>
          </div>
        </div>

        <Button size="md" variant="primary" block onClick={onShelf} disabled={outOfStock}>
          Найти товар на полке
        </Button>
      </div>
    </article>
  );
}
