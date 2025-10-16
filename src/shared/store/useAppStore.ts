import { create } from 'zustand';
import type { Make, Model, Mod } from '@/entities/vehicle/types';
import type { AnchorItem } from '@/shared/ui/AnchorPills/AnchorPills';

type Selected = { make?: Make; model?: Model; mod?: Mod };

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

      const makeTouched =
        'make' in patch && (patch.make?.code ?? null) !== (prev.make?.code ?? null);

      const modelTouched =
        'model' in patch && (patch.model?.code ?? null) !== (prev.model?.code ?? null);

      if (makeTouched) {
        next.model = undefined;
        next.mod = undefined;
      } else if (modelTouched) {
        next.mod = undefined;
      }

      return { selected: next };
    }),

  resetSelected: () => set({ selected: {} }),
}));
