import { Fragment, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '@/entities/product/mockApi';
import { paths } from '@/app/paths';
import Button from '@/shared/ui/Button/Button';
import EmblaCarousel from '@/shared/ui/EmblaCarousel/EmblaCarousel';
import VideoBtn from '@/assets/icons/video.svg?react';
import s from './ProductPage.module.scss';

export default function ProductPage() {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetail(productId);

  const gallery = useMemo(() => data?.media.gallery?.filter(Boolean) ?? [], [data]);

  if (isLoading) return <div className="page container">Загрузка…</div>;
  if (isError || !data) return <div className="page container">Товар не найден</div>;

  const fmtPrice = (v?: number) =>
    v == null ? '—' : new Intl.NumberFormat('ru-RU').format(v) + ' ₽';
  const onShelf = () => navigate(paths.productShelf(productId));

  return (
    <div className="page container">
      <h1 className="title">{data.title}</h1>

      {data.labels?.length && (
        <ul className={s.labels} aria-label="Метки">
          {data.labels.map((t) => (
            <li
              key={t.label}
              className={s.label}
              style={{
                border: t.background ? `1px solid ${t.background}` : undefined,
                color: t.color,
              }}
            >
              {t.label}
            </li>
          ))}
        </ul>
      )}

      <section className={s.card}>
        <div className={s.leftCol}>
          <div className={s.galleryBlock}>
            <EmblaCarousel gallery={gallery} title={data.title} />
          </div>

          {(data.media.video?.url || data.media.video?.qr) && (
            <div className={s.videoBlock}>
              <h3 className={s.subhead}>Видеоинструкция</h3>

              <div className={s.videoRow}>
                {data.media.video?.url && (
                  <a
                    className={s.videoBtn}
                    href={data.media.video.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <VideoBtn />
                  </a>
                )}

                {data.media.video?.qr && (
                  <img className={s.qr} src={data.media.video.qr} alt="QR-код к видеоинструкции" />
                )}
              </div>
            </div>
          )}
        </div>

        <div className={s.rightCol}>
          {!!data.flags?.length && (
            <div className={s.flags} role="group" aria-label="Особые отметки">
              {data.flags.map((f) => (
                <span key={f.id} className={s.flag}>
                  {f.label}
                </span>
              ))}
            </div>
          )}

          {!!data.properties.length && (
            <dl className={s.propsGrid}>
              {data.properties.map((p, i) => (
                <Fragment key={`${p.name}-${i}`}>
                  <dt className={s.propName}>{p.name}</dt>
                  <dd className={s.propVal}>{p.value || '—'}</dd>
                </Fragment>
              ))}
            </dl>
          )}

          <div className={s.productAction}>
            <div className={s.priceRow}>
              <div className={s.price}>{fmtPrice(data.price)}</div>
            </div>

            <div className={s.actions}>
              <Button size="lg" variant="primary" block onClick={onShelf}>
                Найти товар на полке
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
