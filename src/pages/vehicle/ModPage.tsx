import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import { fetchMods } from '@/entities/vehicle/mockApi';
import type { Brand, Model, Mod } from '@/entities/vehicle/types';
import VehicleTile from '@/entities/vehicle/VehicleTile';
import s from './ModPage.module.scss';

export default function ModPage() {
  const navigate = useNavigate();
  const brand = useAppStore((s) => s.selected.brand) as Brand | undefined;
  const model = useAppStore((s) => s.selected.model) as Model | undefined;
  const setSelected = useAppStore((s) => s.setSelected);
  const [mods, setMods] = useState<Mod[] | null>(null);

  useEffect(() => {
    if (!brand) {
      navigate('/vehicle', { replace: true });
      return;
    }
    if (!model) {
      navigate('/vehicle/models', { replace: true });
    }
  }, [brand, model, navigate]);

  useEffect(() => {
    if (!brand || !model) return;
    setMods(null);
    fetchMods(brand, model).then(setMods);
  }, [brand, model]);

  if (!brand || !model) return null;

  return (
    <div className="page container">
      <h1 className="title">Выберите модификацию</h1>

      <div className={s.gridFull}>
        {mods
          ? mods.map((md) => (
              <VehicleTile
                key={md.code}
                label={md.name}
                fullWidth
                onClick={() => {
                  setSelected({ mod: md });
                  navigate('/products');
                }}
              />
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 40, borderRadius: 12 }} />
            ))}
      </div>
    </div>
  );
}
