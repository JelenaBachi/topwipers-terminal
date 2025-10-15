// src/entities/lang/api.ts
import { useQuery } from '@tanstack/react-query';
import type { Lang } from './types';

export function useLanguages() {
  return useQuery<Lang[]>({
    queryKey: ['languages'],
    queryFn: async () => {
      const res = await fetch('http://10.10.8.12/tw/hs/bot/v1/regions', { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const codes = new Set<string>();
      if (Array.isArray(data)) {
        for (const it of data) {
          if (Array.isArray((it as any)?.languages)) {
            for (const c of (it as any).languages) if (typeof c === 'string') codes.add(c);
          }
          const single = (it as any)?.lang ?? (it as any)?.language ?? (it as any)?.codeLang;
          if (typeof single === 'string') codes.add(single);
        }
      }

      if (codes.size === 0) {
        ['ru', 'en', 'de'].forEach((c) => codes.add(c));
      }

      // Подписи для кнопок (если сервер не даёт label)
      const labels: Record<string, string> = {
        ru: '✓ Подбор по автомобилю',
        en: 'Select by Car',
        de: 'Fahrzeug auswählen',
      };

      const order = ['ru', 'en', 'de', ...codes];
      const seen = new Set<string>();
      const list = order
        .filter((c) => {
          const k = String(c).toLowerCase();
          if (!k || seen.has(k)) return false;
          seen.add(k);
          return true;
        })
        .map<Lang>((code) => ({ code, label: labels[code] ?? code }));

      return list;
    },
    staleTime: 10 * 60 * 1000,
  });
}
