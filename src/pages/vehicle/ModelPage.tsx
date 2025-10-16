import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import { fetchModels } from '@/entities/vehicle/mockApi';
import type { Make, Model } from '@/entities/vehicle/types';
import VehicleTile from '@/entities/vehicle/VehicleTile';
import s from './ModelPage.module.scss';

export default function ModelPage() {
  const navigate = useNavigate();
  const make = useAppStore((s) => s.selected.make) as Make | undefined;
  const setSelected = useAppStore((s) => s.setSelected);

  const [models, setModels] = useState<Model[] | null>(null);

  useEffect(() => {
    if (!make) {
      navigate('/vehicle', { replace: true });
    }
  }, [make, navigate]);

  useEffect(() => {
    if (!make) return;
    setModels(null);
    fetchModels(make).then(setModels);
  }, [make]);

  if (!make) return null;

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
