import { useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import type { Brand } from '@/entities/vehicle/types';
import { BRAND_LIST } from '@/entities/vehicle/fixtures';
import BrandTile from '@/entities/vehicle/VehicleTile';
import s from './MakePage.module.scss';

type Make = { code: string; name: string };

export default function MakePage() {
  const navigate = useNavigate();
  const { selected, setSelected } = useAppStore();

  useEffect(() => {
    if (selected.model || selected.mod) {
      setSelected({ model: undefined, mod: undefined });
    }
  }, [selected.model, selected.mod, setSelected]);

  const choose = useCallback(
    (make: Brand) => {
      setSelected({ brand: make });
      navigate('/vehicle/models');
    },
    [navigate, setSelected],
  );

  // Группировка по первой букве + сортировка
  const groups = useMemo(() => {
    const map = new Map<string, Make[]>();
    const items = [...BRAND_LIST].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    );
    for (const m of items) {
      const letter = (m.name[0] || '').toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(m);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <div className="page container">
      <h1 className="title">Выберите марку автомобиля</h1>

      {groups.map(([letter, arr]) => (
        <section key={letter} className={s.section} aria-labelledby={`mk-${letter}`}>
          <div className={s.rowHead}>
            <span id={`mk-${letter}`} className={s.letter} aria-hidden="true">
              {letter}
            </span>
            <hr className={s.rule} />
          </div>

          <div className={s.grid}>
            {arr.map((m) => (
              <BrandTile key={m.code} label={m.name} onClick={() => choose(m)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
