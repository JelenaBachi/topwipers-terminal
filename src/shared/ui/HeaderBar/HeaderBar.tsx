import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import Button from '@/shared/ui/Button/Button';
import ArrowLeft from '@/assets/icons/back.svg?react';
import s from './HeaderBar.module.scss';

type Props = { children?: React.ReactNode };

export default function HeaderBar({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setSelected } = useAppStore();

  if (pathname === '/') return null;

  const { brand, model, mod } = useAppStore((s) => s.selected);
  const resetSelected = useAppStore((st) => st.resetSelected);

  const crumbs = [brand?.name, model?.name, mod?.name].filter(Boolean);
  const canGoBack = pathname !== '/vehicle';

  const onBack = () => {
    if (pathname.startsWith('/vehicle/mods')) {
      setSelected({ mod: undefined });
      navigate('/vehicle/models', { replace: true });
      return;
    }

    if (pathname.startsWith('/vehicle/models')) {
      setSelected({ model: undefined });
      navigate('/vehicle', { replace: true });
      return;
    }

    if (pathname === '/vehicle') {
      resetSelected();
      navigate('/', { replace: true });
      return;
    }

    navigate(-1);
  };

  const onNew = () => {
    resetSelected();
    navigate('/');
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

        <div className={s.selectionTrail} aria-label="Текущий выбор" role="group">
          {crumbs.length === 0 ? (
            ''
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
