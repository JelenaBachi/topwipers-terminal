import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/entities/product/mockApi';
import s from './ProductShelfPage.module.scss';

export default function ProductShelfPage() {
  const { productId = '' } = useParams();
  const { data, isLoading, isError } = useProductDetail(productId);

  if (isLoading) return <div className="page container">Загрузка…</div>;
  if (isError || !data) return <div className="page container">Товар не найден</div>;

  const { storeInfo } = data;
  const gallery = storeInfo?.gallery?.filter(Boolean) ?? [];
  const shelfImg = storeInfo?.shelfData?.img || '';
  const plan = storeInfo?.shelfData?.planogram ?? {};

  const hasPlan =
    !!(plan.aisle && plan.aisle.trim()) ||
    !!(plan.bay && plan.bay.trim()) ||
    !!(plan.shelf && plan.shelf.trim()) ||
    !!(plan.position && plan.position.trim());

  return (
    <div className={`page container ${s.page}`}>
      {storeInfo?.title && <h1 className="title">{storeInfo.title}</h1>}

      {gallery.length > 0 && (
        <div className={s.gallery} role="group" aria-label="Как найти товар на полке">
          {gallery.map((src, i) => (
            <figure key={src + i} className={s.card}>
              <img src={src} alt={`Подсказка ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      )}

      {storeInfo?.shelfData?.title && <h2 className="title">{storeInfo.shelfData.title}</h2>}

      {shelfImg ? (
        <figure className={s.shelfFigure}>
          <img src={shelfImg} alt={storeInfo?.shelfData?.title || 'Фото полки'} />
        </figure>
      ) : null}

      {hasPlan && (
        <div className={s.planogram} role="list" aria-label="Планограмма">
          {plan.aisle && (
            <div className={s.pill} role="listitem">
              <span className={s.pillK}>Ряд</span>
              <span className={s.pillV}>{plan.aisle}</span>
            </div>
          )}
          {plan.bay && (
            <div className={s.pill} role="listitem">
              <span className={s.pillK}>Секция</span>
              <span className={s.pillV}>{plan.bay}</span>
            </div>
          )}
          {plan.shelf && (
            <div className={s.pill} role="listitem">
              <span className={s.pillK}>Полка</span>
              <span className={s.pillV}>{plan.shelf}</span>
            </div>
          )}
          {plan.position && (
            <div className={s.pill} role="listitem">
              <span className={s.pillK}>Позиция</span>
              <span className={s.pillV}>{plan.position}</span>
            </div>
          )}
        </div>
      )}

      <p className={s.hint}>
        Если вы не нашли товар на полке — обратитесь к консультанту, он поможет!
      </p>
    </div>
  );
}
