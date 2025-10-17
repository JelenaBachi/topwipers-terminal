import { Link, useNavigate } from 'react-router-dom';
import s from './ProductCard.module.scss';
import type { Product } from '@/entities/product/types';
import Button from '@/shared/ui/Button/Button';
import CheckIcon from '@/assets/icons/check.svg?react';
import XIcon from '@/assets/icons/close.svg?react';
import { paths } from '@/app/paths';

type Props = {
  product: Product;
  onShelf?: () => void;
};

const fmt = (v?: number) => (v == null ? '—' : new Intl.NumberFormat('ru-RU').format(v) + ' ₽');

export default function ProductCard({ product, onShelf }: Props) {
  const navigate = useNavigate();

  const { id, name, imgUrl, price, sku: _sku, features = [], availability, labels = [] } = product;

  const outOfStock = availability?.inStock === false;

  const handleShelf = () => {
    if (onShelf) onShelf();
    else navigate(paths.productShelf(id));
  };

  return (
    <article className={s.card} aria-label={name}>
      <div className={s.mediaCol}>
        <div className={s.media}>
          {imgUrl ? (
            <img src={imgUrl} alt={name} loading="lazy" />
          ) : (
            <div className={s.placeholder} aria-hidden />
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
                  {availability.label ?? 'В наличии'}
                </>
              ) : (
                <>
                  <XIcon className={s.icon} aria-hidden="true" />
                  {availability.label ?? 'Нет в наличии'}
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
                {labels.filter(Boolean).map((t, i) => (
                  <li
                    key={`${t.label}-${i}`}
                    className={s.label}
                    style={{
                      border: `1px solid ${t.background || undefined}`,
                      color: t.color || undefined,
                    }}
                  >
                    {t.label}
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
            {!outOfStock && (
              <Link className={s.more} to={paths.productDetails(id)}>
                Подробнее о товаре
              </Link>
            )}
          </div>
        </div>

        <Button size="md" variant="primary" block onClick={handleShelf} disabled={outOfStock}>
          Найти товар на полке
        </Button>
      </div>
    </article>
  );
}
