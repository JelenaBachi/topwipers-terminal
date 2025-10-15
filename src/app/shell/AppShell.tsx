import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import HeaderBar from '@/shared/ui/HeaderBar/HeaderBar';
import BrandMark from '@/shared/ui/BrandMark/BrandMark';
import AnchorPills from '@/shared/ui/AnchorPills/AnchorPills';
import s from './AppShell.module.scss';

export default function AppShell() {
  const { pathname } = useLocation();
  const selected = useAppStore((s) => s.selected);
  const resetSelected = useAppStore((s) => s.resetSelected);
  const menu = useAppStore((s) => s.subMenuItems);

  useEffect(() => {
    const hasSelection = !!(selected.brand || selected.model || selected.mod);
    if (pathname === '/' && hasSelection) {
      resetSelected();
    }
  }, [pathname, selected.brand, selected.model, selected.mod, resetSelected]);

  const hideHeader = pathname === '/';
  const showSubHeader = pathname === '/products' && !!menu?.length;

  return (
    <div>
      <div className={!hideHeader ? s.headerWrap : `visually-hidden`}>
        {!hideHeader && <HeaderBar />}
        {showSubHeader && (
          <div className={s.headerSub}>
            <div className="container">
              <AnchorPills items={menu!} />
            </div>
          </div>
        )}
      </div>

      <Outlet />

      <BrandMark className={s.brandMark} />
    </div>
  );
}
