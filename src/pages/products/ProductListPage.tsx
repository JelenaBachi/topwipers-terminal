import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import { useProductList } from '@/entities/product/mockApi';
import { groupsFromMap, toAnchorId, withoutEmpty } from '@/entities/product/utils';
import ProductCard from '@/entities/product/ProductCard';
import { paths } from '@/app/paths';
import s from './ProductListPage.module.scss';

const ORDER = ['wipers', 'batteries', 'bulbs', 'mats'];

export default function ProductListPage() {
  const navigate = useNavigate();
  const make = useAppStore((s) => s.selected.make);
  const model = useAppStore((s) => s.selected.model);
  const mod = useAppStore((s) => s.selected.mod);

  useEffect(() => {
    if (!make) {
      navigate(paths.vehicle(), { replace: true });
      return;
    }
    if (!model) {
      navigate(paths.vehicleMake(), { replace: true });
      return;
    }
    if (!mod) {
      navigate(paths.vehicleModel(), { replace: true });
      return;
    }
  }, [make, model, mod, navigate]);

  if (!make || !model || !mod) return null;

  const { data, isLoading, isError } = useProductList();

  const groups = useMemo(() => groupsFromMap(data, ORDER), [data]);
  const visibleGroups = useMemo(() => withoutEmpty(groups), [groups]);
  const menu = useMemo(
    () => visibleGroups.map((g) => ({ id: toAnchorId(g.id), label: g.label })),
    [visibleGroups],
  );

  const setSubMenu = useAppStore((s) => s.setSubMenu);
  useEffect(() => {
    setSubMenu(menu);
    return () => setSubMenu(null);
  }, [menu, setSubMenu]);

  return (
    <div className="page container">
      {isLoading && <div className="grid">Загрузка…</div>}

      {!isLoading && isError && (
        <div className={s.error}>Не удалось загрузить товары. Попробуйте обновить страницу.</div>
      )}

      {!isLoading &&
        !isError &&
        (visibleGroups.length === 0 ? (
          <div className={s.empty}>Подходящих товаров не найдено</div>
        ) : (
          visibleGroups.map((g) => {
            const anchorId = toAnchorId(g.id);
            return (
              <section key={anchorId} id={anchorId} className={s.section} aria-label={g.label}>
                <h2 className="title">{g.label}</h2>
                <div className={s.grid}>
                  {g.items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            );
          })
        ))}
    </div>
  );
}
