import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import { fetchModels } from '@/entities/vehicle/mockApi';
import type { Brand, Model } from '@/entities/vehicle/types';
import VehicleTile from '@/entities/vehicle/VehicleTile';
import s from './ModelPage.module.scss';

export default function ModelPage() {
  const navigate = useNavigate();
  const brand = useAppStore((s) => s.selected.brand) as Brand | undefined;
  const setSelected = useAppStore((s) => s.setSelected);

  const [models, setModels] = useState<Model[] | null>(null);

  useEffect(() => {
    if (!brand) {
      navigate('/vehicle', { replace: true });
    }
  }, [brand, navigate]);

  useEffect(() => {
    if (!brand) return;
    setModels(null);
    fetchModels(brand).then(setModels);
  }, [brand]);

  if (!brand) return null;

  return (
    <div className="page container">
      <h1 className="title">Выберите модель</h1>

      <div className={s.gridTwo}>
        {models
          ? models.map((m) => (
              <VehicleTile
                key={m.code}
                label={m.name}
                fullWidth
                onClick={() => {
                  setSelected({ model: m });
                  navigate('/vehicle/mods');
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
