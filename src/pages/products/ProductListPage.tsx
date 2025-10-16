import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/shared/store/useAppStore';
import { fetchProductsGrouped } from '@/entities/product/mockApi';
import { groupsFromMap, toAnchorId, withoutEmpty } from '@/entities/product/utils';
import ProductCard from '@/entities/product/ProductCard';
import s from './ProductListPage.module.scss';

const ORDER = ['wipers', 'batteries', 'bulbs', 'mats'];

export default function ProductListPage() {
  const navigate = useNavigate();
  const make = useAppStore((s) => s.selected.make);
  const model = useAppStore((s) => s.selected.model);
  const mod = useAppStore((s) => s.selected.mod);

  useEffect(() => {
    if (!make) {
      navigate('/vehicle', { replace: true });
      return;
    }
    if (!model) {
      navigate('/vehicle/models', { replace: true });
      return;
    }
    if (!mod) {
      navigate('/vehicle/mods', { replace: true });
    }
  }, [make, model, mod, navigate]);

  const { data, isLoading, error } = useQuery({
    enabled: !!make && !!model && !!mod,
    queryKey: ['products-grouped', make?.code, model?.code, mod?.code],
    queryFn: () => fetchProductsGrouped({ make: make!, model: model!, mod: mod! }),
    staleTime: 60_000,
  });

  if (!make || !model || !mod) return null;

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
      {isLoading && <div className="grid">Loading...</div>}
      {!isLoading && error && (
        <div className={s.error}>Не удалось загрузить товары. Попробуйте обновить страницу.</div>
      )}
      {!isLoading &&
        !error &&
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
