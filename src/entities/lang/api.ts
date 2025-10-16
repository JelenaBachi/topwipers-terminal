import { useQuery } from '@tanstack/react-query';
import type { Lang } from './types';

// Possible fields returned by the backend (any of them may appear)
export interface RegionItem {
  languages?: unknown;
  lang?: unknown;
  language?: unknown;
  codeLang?: unknown;
}
export type RegionsResponse = RegionItem[];

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((i) => typeof i === 'string');
}

function toStringOrUndefined(x: unknown): string | undefined {
  return typeof x === 'string' ? x : undefined;
}

function extractLanguageCodes(data: unknown): string[] {
  const codes = new Set<string>();

  if (Array.isArray(data)) {
    for (const it of data as RegionsResponse) {
      if (isStringArray(it.languages)) {
        for (const c of it.languages) codes.add(c);
      }
      const single =
        toStringOrUndefined(it.lang) ??
        toStringOrUndefined(it.language) ??
        toStringOrUndefined(it.codeLang);
      if (single) codes.add(single);
    }
  }

  // Fallback languages if the server returns no data
  if (codes.size === 0) {
    ['ru', 'en', 'de'].forEach((c) => codes.add(c));
  }

  return [...codes];
}

export function useLanguages() {
  return useQuery<Lang[], Error>({
    queryKey: ['languages'],
    queryFn: async () => {
      const res = await fetch('http://10.10.8.12/tw/hs/bot/v1/regions', {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: unknown = await res.json();
      const codes = extractLanguageCodes(data);

      // Button labels (if the server doesn’t provide them)
      const labels: Record<string, string> = {
        ru: '✓ Select by car',
        en: 'Select by Car',
        de: 'Fahrzeug auswählen',
      };

      // Ensure ru/en/de go first, followed by the rest (case-insensitive, no duplicates)
      const order = ['ru', 'en', 'de', ...codes];
      const seen = new Set<string>();

      const list: Lang[] = order
        .filter((c) => {
          const k = String(c).toLowerCase();
          if (!k || seen.has(k)) return false;
          seen.add(k);
          return true;
        })
        .map((code) => ({
          code,
          label: labels[code] ?? code,
        }));

      return list;
    },
    staleTime: 10 * 60 * 1000,
  });
}
