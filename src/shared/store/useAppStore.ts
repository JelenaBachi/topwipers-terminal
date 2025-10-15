import { create } from 'zustand';
import type { Brand, Model, Mod } from '@/entities/vehicle/types';
import type { AnchorItem } from '@/shared/ui/AnchorPills/AnchorPills';

type Selected = { brand?: Brand; model?: Model; mod?: Mod };

type State = {
  lang: string;
  partnerId: string;
  terminalId: string;
  selected: Selected;
  subMenuItems: AnchorItem[] | null;

  setLang: (l: string) => void;
  setPartner: (id: string) => void;
  setTerminal: (id: string) => void;
  setSubMenu: (items: AnchorItem[] | null) => void;

  /** Патч-обновление выбора с каскадным сбросом нижних уровней */
  setSelected: (patch: Partial<Selected>) => void;

  /** Полный сброс выбора */
  resetSelected: () => void;

  
};

export const useAppStore = create<State>((set) => ({
  lang: 'ru',
  partnerId: 'tesco',
  terminalId: 'tesco-budapest-01',
  selected: {},
  subMenuItems: null,

  setLang: (lang) => set({ lang }),
  setPartner: (partnerId) => set({ partnerId }),
  setTerminal: (terminalId) => set({ terminalId }),
  setSubMenu: (items) => set({ subMenuItems: items }),

  setSelected: (patch) =>
    set((state) => {
      const prev = state.selected;
      const next: Selected = { ...prev, ...patch };

      // признак: поле присутствует в patch и значение реально изменилось по code
      const brandTouched =
        Object.prototype.hasOwnProperty.call(patch, 'brand') &&
        (patch.brand?.code ?? null) !== (prev.brand?.code ?? null);

      const modelTouched =
        Object.prototype.hasOwnProperty.call(patch, 'model') &&
        (patch.model?.code ?? null) !== (prev.model?.code ?? null);

      if (brandTouched) {
        next.model = undefined;
        next.mod = undefined;
      } else if (modelTouched) {
        next.mod = undefined;
      }

      return { selected: next };
    }),

  resetSelected: () => set({ selected: {} }),
}));
