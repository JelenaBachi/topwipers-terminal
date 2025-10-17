import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import Button from '@/shared/ui/Button/Button';
import ArrowLeft from '@/assets/icons/back.svg?react';
import { paths } from '@/app/paths';
import s from './HeaderBar.module.scss';

type Props = { children?: React.ReactNode };

export default function HeaderBar({ children: _children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { make, model, mod } = useAppStore((s) => s.selected);
  const { setSelected, resetSelected } = useAppStore();

  if (pathname === paths.home()) return null;

  const crumbs = [make?.name, model?.name, mod?.name].filter(Boolean);
  const canGoBack = pathname !== paths.vehicle();

  const onBack = () => {
    if (pathname.startsWith(paths.vehicleModel())) {
      setSelected({ mod: undefined });
      navigate(paths.vehicleMake(), { replace: true });
      return;
    }

    if (pathname.startsWith(paths.vehicleMake())) {
      setSelected({ model: undefined });
      navigate(paths.vehicle(), { replace: true });
      return;
    }

    if (pathname === paths.vehicle()) {
      resetSelected();
      navigate(paths.home(), { replace: true });
      return;
    }

    navigate(-1);
  };

  const onNew = () => {
    resetSelected();
    navigate(paths.home());
  };

  return (
    <header className={s.header} role="banner">
      <div className={`${s.wrap} container`}>
        <div className={s.top}>
          <div className={s.left}>
            <Button
              size="md"
              variant="glass"
              onClick={onBack}
              className="click-target"
              aria-label={canGoBack ? 'Back' : 'Home'}
            >
              <span className={s.btnBack}>
                <ArrowLeft aria-hidden />
                <span>Назад</span>
              </span>
            </Button>
          </div>

          <div className={s.right}>
            <Button size="lg" variant="glass" className="click-target" onClick={onNew}>
              Новый поиск
            </Button>
          </div>
        </div>

        {crumbs.length > 0 && (
          <div className={s.selectionTrail} aria-label="Текущий выбор" role="group">
            <ol className={s.trailList}>
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <li key={i} className={s.trailItem} aria-current={isLast ? 'true' : undefined}>
                    <span className={s.trailText}>{c}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </header>
  );
}
